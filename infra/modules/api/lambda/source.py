import boto3
import json
import math
import os
import re
import time
from datetime import datetime, timezone
from decimal import Decimal
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from botocore.exceptions import ClientError

# REAL L2: boto3 talks to DynamoDB. No mock data.
# Trips, members and drivers use the same shapes as frontend/app/data.js,
# which is the source of truth. Like data.js, readings and money are strings:
# kilometres are whole-number strings ("120210") and money is dollar strings
# ("20", "98.40"). Pay is worked out from the trip's payType and rate.
#
# The tables keep their original keys (tripId, memberId, driverId).
# The frontend calls every key "id", so we rename it on the way in and out.

dynamodb = boto3.resource("dynamodb")
trips_table = dynamodb.Table(os.environ["TRIPS_TABLE"])
members_table = dynamodb.Table(os.environ["MEMBERS_TABLE"])
drivers_table = dynamodb.Table(os.environ["DRIVERS_TABLE"])

# Same limits as data.js
CHAIR_SPACES = 6
SEAT_SPACES = 3
MAX_EXTRA_STOPS = 3
SEATS = ["Wheelchair", "Seat"]
PAY_TYPES = ["", "paid", "volunteer"]
DROP_PLANS = ["office", "homes"]
MEMBER_DROPS = ["office", "home"]

# The office is in Kitchener, so "today" and "now" use Eastern time like the browser does.
try:
    LOCAL_TZ = ZoneInfo("America/Toronto")
except ZoneInfoNotFoundError:
    LOCAL_TZ = timezone.utc

# Every trip field in data.js (cloneTrip), in the same order, with newTrip's defaults.
# "id" and "date" are filled in when a trip is created.
TRIP_DEFAULTS = {
    "id": "",
    "name": "",
    "place": "",
    "date": "",
    "driverId": "",
    "assignment": True,
    "boardAt": "",
    "destination": "",
    "before": [],
    "after": [],
    "plannedBy": "staff",
    "setUp": False,
    "dropPlan": "office",
    "dropReason": "",
    "status": "ready",
    "startKm": "",
    "startTime": "",
    "endKm": "",
    "endTime": "",
    "litres": "",
    "fuelCost": "",
    "hours": "",
    "payType": "",
    "rate": "",
    "reviewedBy": "",
    "reviewedOn": "",
    "reviewedAt": "",
    "corrected": False,
    "members": [],
}

# Fields a client may set with POST or PATCH. Status has its own rules below.
# "hours" is always worked out from the start and end times, like data.js does.
# The review fields are set by the review transition but can be corrected.
EDITABLE = [k for k in TRIP_DEFAULTS if k not in ("id", "hours", "status")]

# Status flow from data.js:
#   ready -> started    driver signs members in and leaves the office
#   started -> sent     driver finishes the trip and sends it to the office
#   sent -> reviewed    staff mark the trip sheet as checked
#   reviewed -> sent    staff press Undo on the "checked" notice
TRANSITIONS = {
    ("ready", "started"),
    ("started", "sent"),
    ("sent", "reviewed"),
    ("reviewed", "sent"),
}


class BadRequest(Exception):
    pass


def _clean(obj):
    # DynamoDB returns Decimal for numbers, json.dumps cannot handle it.
    if isinstance(obj, Decimal):
        return int(obj) if obj == int(obj) else float(obj)
    if isinstance(obj, dict):
        return {k: _clean(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_clean(v) for v in obj]
    return obj


def _response(status, data):
    return {
        "statusCode": status,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
        },
        "body": json.dumps(_clean(data)),
    }


# --- Same checks as data.js -------------------------------------------------

def _whole_km(value):
    # data.js wholeKm: digits only, else None
    text = str(value).strip()
    return int(text) if re.fullmatch(r"\d+", text) else None


def _amount(value):
    # data.js parseAmount: "" is empty, else up to 2 decimals
    text = str(value).strip()
    if not text:
        return {"empty": True, "bad": False, "value": None}
    if not re.fullmatch(r"\d+(\.\d{1,2})?", text):
        return {"empty": False, "bad": True, "value": None}
    return {"empty": False, "bad": False, "value": float(text)}


def _valid_time(value):
    match = re.fullmatch(r"(\d{1,2}):(\d{2})", str(value).strip())
    return bool(match) and int(match[1]) <= 23 and int(match[2]) <= 59


def _hours_between(start, end):
    # data.js hoursBetween: overnight wraps, same time is None, 2 decimals
    if not _valid_time(start) or not _valid_time(end):
        return None
    sh, sm = (int(x) for x in str(start).strip().split(":"))
    eh, em = (int(x) for x in str(end).strip().split(":"))
    start_min = sh * 60 + sm
    end_min = eh * 60 + em
    if end_min < start_min:
        end_min += 24 * 60
    if end_min == start_min:
        return None
    return _js_round((end_min - start_min) / 60 * 100) / 100


def _js_round(value):
    # JavaScript Math.round: halves go up (Python's round() goes to even)
    return math.floor(value + 0.5)


def _js_number(value):
    # String(8.0) is "8" in JavaScript, String(7.5) is "7.5"
    return str(int(value)) if value == int(value) else str(value)


def _rate_of(trip):
    # data.js rateOf: volunteer is 0, paid uses the trip's rate
    if trip["payType"] == "volunteer":
        return 0
    if trip["payType"] != "paid":
        return None
    parsed = _amount(trip["rate"])
    return None if parsed["empty"] or parsed["bad"] else parsed["value"]


def _pay_for(trip):
    # data.js payFor: hours x rate, in dollars, rounded to cents. None if unknown.
    hours = _amount(trip["hours"])
    rate = _rate_of(trip)
    if hours["empty"] or hours["bad"] or rate is None:
        return None
    return _js_round(hours["value"] * rate * 100) / 100


def _today():
    return datetime.now(LOCAL_TZ).strftime("%Y-%m-%d")


def _now_clock():
    return datetime.now(LOCAL_TZ).strftime("%H:%M")


def _slug_id(name, fallback, taken):
    # data.js freeId: "Helen Cho" -> "helen-cho", then "helen-cho-2" if taken
    base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or fallback
    new_id, count = base, 2
    while new_id in taken:
        new_id = f"{base}-{count}"
        count += 1
    return new_id


# --- Trips ------------------------------------------------------------------

def _check_string(trip, key):
    if not isinstance(trip[key], str):
        raise BadRequest(f"{key} must be a string")


def _check_member(member):
    if not isinstance(member, dict):
        raise BadRequest("Each member must be an object")
    for key in ["id", "name", "seat", "home", "spot", "dropAt", "drop"]:
        if not isinstance(member.get(key, ""), str):
            raise BadRequest(f"member {key} must be a string")
    if not member.get("id") or not member.get("name"):
        raise BadRequest("Each member needs an id and a name")
    if member.get("seat") not in SEATS:
        raise BadRequest("member seat must be Wheelchair or Seat")
    if member.get("drop", "office") not in MEMBER_DROPS:
        raise BadRequest("member drop must be office or home")
    if not isinstance(member.get("aboard", False), bool):
        raise BadRequest("member aboard must be true or false")
    return {
        "id": member["id"],
        "name": member["name"],
        "seat": member["seat"],
        "home": member.get("home", ""),
        "spot": member.get("spot", ""),
        "dropAt": member.get("dropAt", ""),
        "drop": member.get("drop", "office"),
        "aboard": member.get("aboard", False),
    }


def _validate_trip(trip):
    """Check a whole trip and fill in hours. Messages match data.js where it has one."""
    for key, default in TRIP_DEFAULTS.items():
        if isinstance(default, str):
            _check_string(trip, key)
        elif isinstance(default, bool) and not isinstance(trip[key], bool):
            raise BadRequest(f"{key} must be true or false")

    if trip["date"] and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", trip["date"]):
        raise BadRequest("date must look like 2026-11-06")
    for key in ["boardAt", "startTime", "reviewedAt"]:
        if trip[key] and not _valid_time(trip[key]):
            raise BadRequest(f"{key} must be a time like 09:30")
    if trip["endTime"] and not _valid_time(trip["endTime"]):
        raise BadRequest("Enter the end time, like 1:05 PM.")
    if trip["reviewedOn"] and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", trip["reviewedOn"]):
        raise BadRequest("reviewedOn must look like 2026-11-06")

    # Stops: the destination plus up to 3 places before or after it
    for key in ["before", "after"]:
        if not isinstance(trip[key], list) or not all(isinstance(s, str) for s in trip[key]):
            raise BadRequest(f"{key} must be a list of places")
    if len(trip["before"]) + len(trip["after"]) > MAX_EXTRA_STOPS:
        raise BadRequest(f"{MAX_EXTRA_STOPS} stops is the most for one trip.")

    # Members and bus spaces
    if not isinstance(trip["members"], list):
        raise BadRequest("members must be a list")
    trip["members"] = [_check_member(m) for m in trip["members"]]
    ids = [m["id"] for m in trip["members"]]
    if len(ids) != len(set(ids)):
        raise BadRequest("A member is listed twice")
    chairs = sum(1 for m in trip["members"] if m["seat"] == "Wheelchair")
    if chairs > CHAIR_SPACES:
        raise BadRequest(f"The bus has {CHAIR_SPACES} wheelchair spaces. Remove a wheelchair user.")
    if len(trip["members"]) - chairs > SEAT_SPACES:
        raise BadRequest(f"The bus has {SEAT_SPACES} seats. Remove a member who does not use a wheelchair.")

    if trip["dropPlan"] not in DROP_PLANS:
        raise BadRequest("dropPlan must be office or homes")

    # Pay
    if trip["payType"] not in PAY_TYPES:
        raise BadRequest("Choose Volunteer or Paid.")
    if trip["payType"] == "volunteer":
        trip["rate"] = ""
    rate = _amount(trip["rate"])
    if rate["bad"] or (trip["payType"] == "paid" and (rate["empty"] or rate["value"] <= 0)):
        raise BadRequest("Enter the hourly rate, like 20.00.")

    # Kilometres
    if trip["startKm"] and _whole_km(trip["startKm"]) is None:
        raise BadRequest("Enter the beginning kilometres as a whole number.")
    if trip["endKm"] and _whole_km(trip["endKm"]) is None:
        raise BadRequest("Enter the ending kilometres as a whole number.")
    if trip["startKm"] and trip["endKm"] and _whole_km(trip["endKm"]) < _whole_km(trip["startKm"]):
        raise BadRequest("Ending kilometres are below the beginning kilometres.")

    # Fuel (data.js applyFuel): both or neither
    litres, cost = _amount(trip["litres"]), _amount(trip["fuelCost"])
    if litres["bad"]:
        raise BadRequest("Enter fuel litres as a number.")
    if cost["bad"]:
        raise BadRequest("Enter the fuel cost as a number, like 98.40.")
    if litres["empty"] != cost["empty"]:
        raise BadRequest("Enter both litres and cost, or leave both blank.")

    # Hours come from the start and end times, as a string like data.js stores them
    trip["hours"] = ""
    if trip["startTime"] and trip["endTime"]:
        hours = _hours_between(trip["startTime"], trip["endTime"])
        if hours is None:
            raise BadRequest("Enter an end time after the start.")
        trip["hours"] = _js_number(hours)


def _change_status(trip, new_status, body, claims):
    """Move a trip along the data.js status flow, with the same checks the screens make."""
    old_status = trip["status"]
    if new_status == old_status:
        return
    if (old_status, new_status) not in TRANSITIONS:
        raise BadRequest(f"A trip can't go from {old_status} to {new_status}")

    if new_status == "started":
        if not any(m["aboard"] for m in trip["members"]):
            raise BadRequest("Sign in each member who is at the office.")

    if new_status == "sent" and old_status == "started":
        # The driver has to finish the trip (end km and time) before sending it
        if not trip["endKm"]:
            raise BadRequest("Enter the ending kilometres as a whole number.")
        if not trip["endTime"]:
            raise BadRequest("Enter the end time, like 1:05 PM.")

    if new_status == "reviewed":
        if not trip["startKm"]:
            raise BadRequest("Enter the beginning kilometres as a whole number.")
        if not trip["endKm"]:
            raise BadRequest("Enter the ending kilometres as a whole number.")
        if not trip["startTime"]:
            raise BadRequest("Enter the start time, like 8:40 AM.")
        if not trip["endTime"]:
            raise BadRequest("Enter the end time, like 1:05 PM.")
        # data.js stores the reviewer's person id. Fall back to the signed-in username.
        trip["reviewedBy"] = body.get("reviewedBy") or (claims or {}).get("cognito:username") or ""
        trip["reviewedOn"] = body.get("reviewedOn") or _today()
        trip["reviewedAt"] = body.get("reviewedAt") or _now_clock()
        trip["corrected"] = body.get("corrected", trip["corrected"])

    if new_status == "sent" and old_status == "reviewed":
        # Undo clears the review
        trip["reviewedBy"] = ""
        trip["reviewedOn"] = ""
        trip["reviewedAt"] = ""
        trip["corrected"] = False

    trip["status"] = new_status


def _trip_out(item):
    # DynamoDB item -> data.js trip, plus "pay" worked out like data.js payFor
    trip = {key: item.get(key, default) for key, default in TRIP_DEFAULTS.items()}
    trip["id"] = item["tripId"]
    if not trip["name"]:
        trip["name"] = "New trip"
    trip["pay"] = _pay_for(trip)
    return _clean(trip)


def _trip_item(trip):
    item = {k: v for k, v in trip.items() if k in TRIP_DEFAULTS and k != "id"}
    item["tripId"] = trip["id"]
    return item


def _get_trip(trip_id):
    return trips_table.get_item(Key={"tripId": trip_id}).get("Item")


def _apply_edits(trip, body):
    unknown = [k for k in body if k not in EDITABLE and k not in ("id", "status", "hours", "pay")]
    if unknown:
        raise BadRequest(f"Unknown or read-only field: {', '.join(sorted(unknown))}")
    for key in EDITABLE:
        if key in body:
            trip[key] = body[key]


def _active_driver_ids():
    drivers = drivers_table.scan().get("Items", [])
    return [d["driverId"] for d in drivers if d.get("active", True) is not False]


# --- Members and drivers ----------------------------------------------------

def _member_out(item):
    # data.js copyMember
    return {
        "id": item["memberId"],
        "name": item.get("name", ""),
        "seat": item.get("seat", ""),
        "home": item.get("home", ""),
        "spot": item.get("spot", ""),
    }


def _driver_out(item):
    # data.js copyDriver, without the PIN (sign-in is Cognito's job now)
    return {
        "id": item["driverId"],
        "full": item.get("full", ""),
        "active": item.get("active", True) is not False,
    }


def _save_member(body):
    # data.js saveMember: same id replaces, no id makes a new one from the name
    for key in ["name", "seat", "home", "spot"]:
        if not isinstance(body.get(key, ""), str):
            raise BadRequest(f"{key} must be a string")
    name = body.get("name", "").strip()
    if not name:
        raise BadRequest("Enter the member's full name.")
    if body.get("seat") not in SEATS:
        raise BadRequest("seat must be Wheelchair or Seat")
    member_id = body.get("id")
    if not member_id:
        taken = [m["memberId"] for m in members_table.scan().get("Items", [])]
        member_id = _slug_id(name, "member", taken)
    item = {
        "memberId": member_id,
        "name": name,
        "seat": body["seat"],
        "home": body.get("home", ""),
        "spot": body.get("spot", ""),
    }
    members_table.put_item(Item=item)
    return _member_out(item)


def _save_driver(body):
    # data.js saveDriver, but any PIN sent is dropped and never stored
    if not isinstance(body.get("full", ""), str):
        raise BadRequest("full must be a string")
    full = body.get("full", "").strip()
    if not full:
        raise BadRequest("Enter the driver's full name.")
    active = body.get("active", True)
    if not isinstance(active, bool):
        raise BadRequest("active must be true or false")
    driver_id = body.get("id")
    if not driver_id:
        taken = [d["driverId"] for d in drivers_table.scan().get("Items", [])]
        driver_id = _slug_id(full, "driver", taken)
    item = {"driverId": driver_id, "full": full, "active": active}
    drivers_table.put_item(Item=item)
    return _driver_out(item)


# --- Routes -----------------------------------------------------------------

def lambda_handler(event, context):
    http = event.get("requestContext", {}).get("http", {})
    method = http.get("method", "")
    path = http.get("path", "/")
    query = event.get("queryStringParameters") or {}
    claims = event.get("requestContext", {}).get("authorizer", {}).get("jwt", {}).get("claims")
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        body = {}
    if not isinstance(body, dict):
        body = {}
    parts = [p for p in path.split("/") if p]

    try:
        return _route(method, path, parts, query, body, claims)
    except BadRequest as err:
        return _response(400, {"error": str(err)})


def _route(method, path, parts, query, body, claims):
    # GET /me
    if method == "GET" and path == "/me":
        if not claims:
            return _response(401, {"error": "Unauthorized"})
        groups = claims.get("cognito:groups") or []
        if isinstance(groups, str):
            try:
                groups = json.loads(groups)
            except json.JSONDecodeError:
                groups = [group.strip() for group in groups.strip("[]").split(",") if group.strip()]
            if isinstance(groups, str):
                groups = [groups]
        return _response(200, {
            "userId": claims.get("sub"),
            "name": claims.get("cognito:username") or claims.get("email"),
            "role": groups[0] if groups else "driver",
        })

    # GET /trips?driverId=
    if method == "GET" and path == "/trips":
        trips = [_trip_out(t) for t in trips_table.scan().get("Items", [])]
        if query.get("driverId"):
            trips = [t for t in trips if t["driverId"] == query["driverId"]]
        return _response(200, {"trips": trips})

    # POST /trips - a new trip always starts as "ready"
    if method == "POST" and path == "/trips":
        if body.get("status", "ready") != "ready":
            raise BadRequest("A new trip starts as ready")
        trip = dict(TRIP_DEFAULTS, before=[], after=[], members=[])
        if not isinstance(body.get("id", ""), str):
            raise BadRequest("id must be a string")
        trip["id"] = body.get("id") or f"trip-{int(time.time() * 1000)}"
        trip["date"] = _today()
        # data.js newTrip: pick the driver if there is only one
        active = _active_driver_ids()
        if len(active) == 1:
            trip["driverId"] = active[0]
        _apply_edits(trip, body)
        _validate_trip(trip)
        try:
            trips_table.put_item(
                Item=_trip_item(trip),
                ConditionExpression="attribute_not_exists(tripId)",
            )
        except ClientError as err:
            if err.response["Error"]["Code"] == "ConditionalCheckFailedException":
                return _response(409, {"error": "A trip with this id already exists"})
            raise
        return _response(201, _trip_out(_trip_item(trip)))

    # GET /trips/{id}
    if method == "GET" and len(parts) == 2 and parts[0] == "trips":
        item = _get_trip(parts[1])
        if not item:
            return _response(404, {"error": "Trip not found"})
        return _response(200, _trip_out(item))

    # PATCH /trips/{id} - edit any field, and move the status along the data.js flow
    if method == "PATCH" and len(parts) == 2 and parts[0] == "trips":
        item = _get_trip(parts[1])
        if not item:
            return _response(404, {"error": "Trip not found"})
        if "id" in body and body["id"] != parts[1]:
            raise BadRequest("A trip's id can't be changed")
        trip = _trip_out(item)
        trip.pop("pay")
        _apply_edits(trip, body)
        _validate_trip(trip)
        if "status" in body:
            _change_status(trip, body["status"], body, claims)
        trips_table.put_item(Item=_trip_item(trip))
        return _response(200, _trip_out(_trip_item(trip)))

    # POST /trips/{id}/complete - the driver sends the trip to the office (started -> sent)
    if method == "POST" and len(parts) == 3 and parts[0] == "trips" and parts[2] == "complete":
        item = _get_trip(parts[1])
        if not item:
            return _response(404, {"error": "Trip not found"})
        trip = _trip_out(item)
        trip.pop("pay")
        _validate_trip(trip)
        _change_status(trip, "sent", {}, claims)
        trips_table.put_item(Item=_trip_item(trip))
        return _response(200, _trip_out(_trip_item(trip)))

    # GET /members?q= and GET /members/{id}
    if method == "GET" and path == "/members":
        members = [_member_out(m) for m in members_table.scan().get("Items", [])]
        q = (query.get("q") or "").lower()
        if q:
            members = [m for m in members if q in m["name"].lower()]
        members.sort(key=lambda m: m["name"].lower())
        return _response(200, {"members": members})
    if method == "GET" and len(parts) == 2 and parts[0] == "members":
        item = members_table.get_item(Key={"memberId": parts[1]}).get("Item")
        if not item:
            return _response(404, {"error": "Member not found"})
        return _response(200, _member_out(item))

    # POST /members - add a member, or replace one when the id is given
    if method == "POST" and path == "/members":
        return _response(201, _save_member(body))

    # GET /drivers
    if method == "GET" and path == "/drivers":
        drivers = [_driver_out(d) for d in drivers_table.scan().get("Items", [])]
        drivers.sort(key=lambda d: d["full"].lower())
        return _response(200, {"drivers": drivers})

    # POST /drivers - add a driver, or replace one when the id is given (active: false to remove)
    if method == "POST" and path == "/drivers":
        return _response(201, _save_driver(body))

    return _response(404, {"error": f"No route for {method} {path}"})
