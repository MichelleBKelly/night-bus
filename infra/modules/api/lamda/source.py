import json
import uuid

# Starter L2: routing only, mock data, no DynamoDB yet.
# Step 1: get this live. Step 2: replace the mock returns with DynamoDB calls.

def _response(status, data):
    return {
        "statusCode": status,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
        },
        "body": json.dumps(data),
    }


def lambda_handler(event, context):
    http = event.get("requestContext", {}).get("http", {})
    method = http.get("method", "")
    path = http.get("path", "/")
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        body = {}

    # GET /me - who is logged in (mock for now, L2 will verify the token later)
    if method == "GET" and path == "/me":
        return _response(200, {"userId": "driver-1", "name": "Test Driver", "role": "driver"})

    # GET /trips - list trips (mock)
    if method == "GET" and path == "/trips":
        return _response(200, {"trips": []})

    # POST /trips - start a trip
    if method == "POST" and path == "/trips":
        trip_id = str(uuid.uuid4())[:8]
        return _response(201, {
            "tripId": trip_id,
            "date": body.get("date"),
            "driverId": body.get("driverId"),
            "startMileage": body.get("startMileage"),
            "startTime": body.get("startTime"),
            "status": "in_progress",
            "totalMileage": None,
            "driverHours": None,
            "payDue": None,
        })

    # GET /trips/{tripId}
    if method == "GET" and path.startswith("/trips/") and path.count("/") == 2:
        trip_id = path.split("/")[2]
        return _response(200, {
            "tripId": trip_id,
            "date": "2026-11-07",
            "driverId": "driver-1",
            "status": "in_progress",
            "stops": [],
            "manifest": [],
            "expenses": [],
        })

    # POST /trips/{tripId}/complete
    if method == "POST" and path.endswith("/complete"):
        trip_id = path.split("/")[2]
        # TODO: load the trip from DynamoDB, calculate:
        # totalMileage = endMileage - startMileage
        # driverHours = endTime - startTime
        # payDue = driverHours * hourlyRate
        return _response(200, {"tripId": trip_id, "status": "completed", "totalMileage": 85, "driverHours": 5.5, "payDue": 137.5})

    # GET /members?q=
    if method == "GET" and path == "/members":
        return _response(200, {"members": [
            {"memberId": "member-1", "name": "Test Member", "homeAddress": "123 Main St", "needsWheelchair": False},
        ]})

    return _response(404, {"error": f"No route for {method} {path}"})
