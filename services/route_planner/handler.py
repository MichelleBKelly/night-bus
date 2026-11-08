import base64
import json
import math

import boto3
from botocore.exceptions import ClientError, ParamValidationError


# Lambda uses its execution role to call these AWS services.
routes = boto3.client("geo-routes")
places = boto3.client("geo-places")


def reply(status_code, data):
    """Return the response format expected by API Gateway."""
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(data),
    }


def check_position(value, field_name):
    """Resolve an address or validate [longitude, latitude]."""
    if isinstance(value, str):
        address = value.strip()

        if not address:
            raise ValueError(f"{field_name} address must not be empty")

        result = places.geocode(
            QueryText=address,
            MaxResults=1,
            BiasPosition=[-80.5204, 43.4643],
            Filter={"IncludeCountries": ["CAN"]},
            IntendedUse="Storage",
        )

        matches = result.get("ResultItems", [])

        if not matches:
            raise ValueError(f"No location found for {field_name}")

        value = matches[0]["Position"]

    if not isinstance(value, list) or len(value) != 2:
        raise ValueError(
            f"{field_name} must be an address or [longitude, latitude]"
        )

    longitude, latitude = value

    for name, number in [
        ("longitude", longitude),
        ("latitude", latitude),
    ]:
        if (
            isinstance(number, bool)
            or not isinstance(number, (int, float))
            or not math.isfinite(number)
        ):
            raise ValueError(f"{field_name} {name} must be a finite number")

    if not -180 <= longitude <= 180:
        raise ValueError(f"{field_name} longitude is out of range")

    if not -90 <= latitude <= 90:
        raise ValueError(f"{field_name} latitude is out of range")

    return [float(longitude), float(latitude)]


def lambda_handler(event, context):
    # Read and validate the request.
    try:
        if not isinstance(event, dict):
            raise ValueError("Request must be a JSON object")

        payload = event

        if "body" in event:
            raw_body = event["body"]

            if event.get("isBase64Encoded"):
                raw_body = base64.b64decode(raw_body).decode("utf-8")

            payload = (
                json.loads(raw_body)
                if isinstance(raw_body, str)
                else raw_body
            )

        if not isinstance(payload, dict):
            raise ValueError("Request must be a JSON object")

        stops = payload.get("stops", [])
        departure_time = payload.get("departureTime")
        consumption = payload.get("fuelConsumptionLPer100Km")
        fuel_price = payload.get("fuelPriceCadPerLitre")

        if not isinstance(stops, list) or len(stops) > 15:
            raise ValueError(
                "stops must be a list with no more than 15 entries"
            )

        if departure_time is not None:
            if not isinstance(departure_time, str) or not departure_time.strip():
                raise ValueError("departureTime must be a non-empty timestamp")

        if (consumption is None) != (fuel_price is None):
            raise ValueError(
                "Provide both fuelConsumptionLPer100Km "
                "and fuelPriceCadPerLitre"
            )

        if consumption is not None:
            for name, value in [
                ("fuelConsumptionLPer100Km", consumption),
                ("fuelPriceCadPerLitre", fuel_price),
            ]:
                if (
                    isinstance(value, bool)
                    or not isinstance(value, (int, float))
                    or not math.isfinite(value)
                    or value <= 0
                ):
                    raise ValueError(f"{name} must be a positive finite number")

        # Validate stop IDs before making geocoding requests.
        stop_by_id = {}

        for stop in stops:
            if not isinstance(stop, dict) or not stop.get("id"):
                raise ValueError("Each stop needs an id and position")

            stop_id = str(stop["id"])

            if stop_id in ("origin", "destination"):
                raise ValueError("Stop IDs cannot be origin or destination")

            if stop_id in stop_by_id:
                raise ValueError(f"Duplicate stop id: {stop_id}")

            stop_by_id[stop_id] = {
                "id": stop_id,
                "position": stop.get("position"),
            }

        # Each location can be an address string or coordinate array.
        origin = check_position(payload.get("origin"), "origin")
        destination = check_position(
            payload.get("destination"), "destination"
        )

        for stop in stop_by_id.values():
            stop["position"] = check_position(
                stop["position"], f"stop {stop['id']}"
            )

    except (ValueError, TypeError) as error:
        return reply(400, {"error": str(error)})

    except ParamValidationError:
        return reply(400, {"error": "Invalid geocoding request"})

    except ClientError as error:
        code = error.response.get("Error", {}).get(
            "Code", "GeocodingFailed"
        )
        return reply(502, {"error": code})

    ordered_stops = list(stop_by_id.values())

    # Optimize the stops and calculate the route.
    try:
        if ordered_stops:
            optimize_request = {
                "Origin": origin,
                "OriginOptions": {"Id": "origin"},
                "Destination": destination,
                "DestinationOptions": {"Id": "destination"},
                "Waypoints": [
                    {
                        "Id": stop["id"],
                        "Position": stop["position"],
                    }
                    for stop in ordered_stops
                ],
                "OptimizeSequencingFor": "FastestRoute",
                "TravelMode": "Car",
            }

            if departure_time:
                optimize_request["DepartureTime"] = departure_time

            optimized = routes.optimize_waypoints(**optimize_request)

            if optimized.get("ImpedingWaypoints"):
                return reply(422, {
                    "error": "AWS could not include every stop"
                })

            stop_ids_in_order = [
                waypoint["Id"]
                for waypoint in optimized.get("OptimizedWaypoints", [])
                if waypoint.get("Id") in stop_by_id
            ]

            # Never silently drop a requested pickup.
            if (
                len(stop_ids_in_order) != len(stop_by_id)
                or set(stop_ids_in_order) != set(stop_by_id)
            ):
                return reply(422, {
                    "error": "AWS did not return every pickup exactly once"
                })

            ordered_stops = [
                stop_by_id[stop_id]
                for stop_id in stop_ids_in_order
            ]

        route_request = {
            "Origin": origin,
            "Destination": destination,
            "TravelMode": "Car",
            "LegGeometryFormat": "Simple",
            "LegAdditionalFeatures": ["Summary"],
        }

        if ordered_stops:
            route_request["Waypoints"] = [
                {"Position": stop["position"]}
                for stop in ordered_stops
            ]

        if departure_time:
            route_request["DepartureTime"] = departure_time

        calculated = routes.calculate_routes(**route_request)
        calculated_routes = calculated.get("Routes", [])

        if not calculated_routes:
            return reply(422, {"error": "No route was found"})

        route = calculated_routes[0]
        summary = route["Summary"]

        # Estimate fuel using the caller's consumption and price inputs.
        fuel_estimate = None

        if consumption is not None:
            distance_km = summary["Distance"] / 1000
            litres = distance_km * consumption / 100

            fuel_estimate = {
                "litres": round(litres, 2),
                "costCad": round(litres * fuel_price, 2),
                "consumptionLPer100Km": consumption,
                "priceCadPerLitre": fuel_price,
                "note": "Distance-based estimate; no separate idling allowance.",
            }

        return reply(200, {
            "orderedStopIds": [
                stop["id"] for stop in ordered_stops
            ],
            "origin": origin,
            "destination": destination,
            "orderedStops": ordered_stops,
            "distanceMeters": summary["Distance"],
            "durationSeconds": summary["Duration"],
            "fuelEstimate": fuel_estimate,
            "legs": [
                leg.get("Geometry", {}).get("LineString", [])
                for leg in route.get("Legs", [])
            ],
        })

    except ParamValidationError:
        return reply(400, {
            "error": "Invalid route request; check locations and departureTime"
        })

    except ClientError as error:
        code = error.response.get("Error", {}).get(
            "Code", "RouteCalculationFailed"
        )
        return reply(502, {"error": code})