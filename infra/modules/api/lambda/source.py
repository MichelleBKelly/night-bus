import boto3
import json
import os
import uuid
from datetime import datetime
from decimal import Decimal

# REAL L2: boto3 talks to DynamoDB. No mock data.
# Money is stored in cents (int) to avoid Decimal / float problems.
# Example: $25.00 per hour = 2500 cents. Pay = hours * rate / 100.

dynamodb = boto3.resource("dynamodb")
trips_table = dynamodb.Table(os.environ["TRIPS_TABLE"])
members_table = dynamodb.Table(os.environ["MEMBERS_TABLE"])
drivers_table = dynamodb.Table(os.environ["DRIVERS_TABLE"])


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


def _get_trip(trip_id):
    result = trips_table.get_item(Key={"tripId": trip_id})
    return result.get("Item")


def _hours(start, end):
    # Times are "18:00" strings. Returns hours as a float, e.g. 5.5
    fmt = "%H:%M"
    delta = datetime.strptime(end, fmt) - datetime.strptime(start, fmt)
    return round(delta.total_seconds() / 3600, 2)


def lambda_handler(event, context):
    http = event.get("requestContext", {}).get("http", {})
    method = http.get("method", "")
    path = http.get("path", "/")
    query = event.get("queryStringParameters") or {}
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        body = {}
    parts = [p for p in path.split("/") if p]

    # GET /me
    if method == "GET" and path == "/me":
        return _response(200, {"userId": "driver-1", "name": "Test Driver", "role": "driver"})

    # GET /trips?driverId=
    if method == "GET" and path == "/trips":
        result = trips_table.scan()
        trips = result.get("Items", [])
        if query.get("driverId"):
            trips = [t for t in trips if t.get("driverId") == query["driverId"]]
        return _response(200, {"trips": trips})

    # POST /trips - save it for real
    if method == "POST" and path == "/trips":
        trip_id = str(uuid.uuid4())[:8]
        trip = {
            "tripId": trip_id,
            "date": body.get("date"),
            "driverId": body.get("driverId"),
            "busId": body.get("busId", "bus-1"),
            "startTime": body.get("startTime"),
            "endTime": None,
            "startMileage": body.get("startMileage"),
            "endMileage": None,
            "totalMileage": None,
            "driverHours": None,
            "payDueCents": None,
            "startLocation": body.get("startLocation"),
            "status": "in_progress",
            "stops": [],
            "manifest": [],
            "expenses": [],
        }
        trips_table.put_item(Item=trip)
        return _response(201, trip)

    # GET /trips/{tripId}
    if method == "GET" and len(parts) == 2 and parts[0] == "trips":
        trip = _get_trip(parts[1])
        if not trip:
            return _response(404, {"error": "Trip not found"})
        return _response(200, trip)

    # PATCH /trips/{tripId} - end a trip or fix a field
    if method == "PATCH" and len(parts) == 2 and parts[0] == "trips":
        trip = _get_trip(parts[1])
        if not trip:
            return _response(404, {"error": "Trip not found"})
        for key in ["date", "driverId", "endTime", "endMileage", "startTime", "startMileage"]:
            if key in body:
                trip[key] = body[key]
        if trip.get("endMileage") is not None and trip.get("startMileage") is not None:
            trip["totalMileage"] = trip["endMileage"] - trip["startMileage"]
        if trip.get("endTime") and trip.get("startTime"):
            trip["driverHours"] = _hours(trip["startTime"], trip["endTime"])
        trips_table.put_item(Item=trip)
        return _response(200, trip)

    # POST /trips/{tripId}/complete - calculate pay for real
    if method == "POST" and len(parts) == 3 and parts[0] == "trips" and parts[2] == "complete":
        trip = _get_trip(parts[1])
        if not trip:
            return _response(404, {"error": "Trip not found"})
        if not trip.get("endTime") or trip.get("endMileage") is None:
            return _response(400, {"error": "End time and end mileage are required first"})
        trip["totalMileage"] = trip["endMileage"] - trip["startMileage"]
        trip["driverHours"] = _hours(trip["startTime"], trip["endTime"])
        driver = drivers_table.get_item(Key={"driverId": trip["driverId"]}).get("Item")
        rate_cents = driver.get("hourlyRateCents", 0) if driver else 0
        trip["payDueCents"] = int(trip["driverHours"] * rate_cents)
        trip["status"] = "completed"
        trips_table.put_item(Item=trip)
        return _response(200, trip)

    # GET /trips/{tripId}/stops and POST /trips/{tripId}/stops
    if len(parts) == 3 and parts[0] == "trips" and parts[2] == "stops":
        trip = _get_trip(parts[1])
        if not trip:
            return _response(404, {"error": "Trip not found"})
        if method == "GET":
            return _response(200, {"stops": trip.get("stops", [])})
        if method == "POST":
            if len(trip.get("stops", [])) >= 15:
                return _response(400, {"error": "Max 15 stops per trip"})
            stop = {"stopId": str(uuid.uuid4())[:8], **body}
            trip["stops"] = trip.get("stops", []) + [stop]
            trips_table.put_item(Item=trip)
            return _response(201, stop)

    # GET /trips/{tripId}/manifest and POST /trips/{tripId}/manifest
    if len(parts) == 3 and parts[0] == "trips" and parts[2] == "manifest":
        trip = _get_trip(parts[1])
        if not trip:
            return _response(404, {"error": "Trip not found"})
        if method == "GET":
            return _response(200, {"manifest": trip.get("manifest", [])})
        if method == "POST":
            if len(trip.get("manifest", [])) >= 9:
                return _response(400, {"error": "Bus is full - max 9 passengers"})
            trip["manifest"] = trip.get("manifest", []) + [body]
            trips_table.put_item(Item=trip)
            return _response(201, body)

    # GET /trips/{tripId}/expenses and POST /trips/{tripId}/expenses
    if len(parts) == 3 and parts[0] == "trips" and parts[2] == "expenses":
        trip = _get_trip(parts[1])
        if not trip:
            return _response(404, {"error": "Trip not found"})
        if method == "GET":
            return _response(200, {"expenses": trip.get("expenses", [])})
        if method == "POST":
            expense = {"expenseId": str(uuid.uuid4())[:8], **body}
            trip["expenses"] = trip.get("expenses", []) + [expense]
            trips_table.put_item(Item=trip)
            return _response(201, expense)

    # GET /members?q= and GET /members/{memberId}
    if method == "GET" and path == "/members":
        result = members_table.scan()
        members = result.get("Items", [])
        q = (query.get("q") or "").lower()
        if q:
            members = [m for m in members if q in str(m.get("name", "")).lower()]
        return _response(200, {"members": members})
    if method == "GET" and len(parts) == 2 and parts[0] == "members":
        result = members_table.get_item(Key={"memberId": parts[1]})
        member = result.get("Item")
        if not member:
            return _response(404, {"error": "Member not found"})
        return _response(200, member)

    # GET /drivers
    if method == "GET" and path == "/drivers":
        result = drivers_table.scan()
        return _response(200, {"drivers": result.get("Items", [])})

    return _response(404, {"error": f"No route for {method} {path}"})
