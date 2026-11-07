"""
Login endpoint for Night Bus
API Gateway sends us { "username", "password" } -> we ask Cognito if thats right -> hand back the tokens + groups

Example:
POST { "username": "sam", "password": "hunter2" }
-> 200 { idToken, accessToken, expiresIn, groups: ["driver"] }

The frontend uses groups to decide what screens to show (admin / driver / member)
No API Gateway stuff lives here, thats Michelle's api module
"""

import base64
import json
import os

import boto3
from botocore.exceptions import ClientError

# boto3 already ships with the Lambda python runtime -> no requirements.txt, no zipping deps
# made outside the handler so warm starts reuse it instead of making a new one every request
cognito = boto3.client("cognito-idp")
CLIENT_ID = os.environ["USER_POOL_CLIENT_ID"]  # set by terraform from our app client

# same message for wrong password AND unknown user
# otherwise people can poke usernames to see which ones exist
INVALID_CREDENTIALS = "Incorrect username or password."


def respond(status_code, body):
    # API Gateway proxy format, it wants body as a string not a dict
    # no CORS headers on purpose -> still being decided with the API owner
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def parse_body(event):
    """Junk / missing body -> empty dict so it just falls through to the 400"""
    raw = (event or {}).get("body")
    if not raw:
        return {}

    # API Gateway sometimes base64s the body depending on how its set up
    if event.get("isBase64Encoded"):
        raw = base64.b64decode(raw).decode("utf-8")

    try:
        parsed = json.loads(raw)
    except ValueError:
        return {}
    return parsed if isinstance(parsed, dict) else {}


def groups_from_id_token(id_token):
    # JWT = header.payload.signature, we only want the middle bit
    # not checking the signature here because we literally just got it from Cognito in this request
    try:
        payload = id_token.split(".")[1]
        # JWTs strip the "=" padding but python wants it back or b64decode throws
        payload += "=" * (-len(payload) % 4)
        claims = json.loads(base64.urlsafe_b64decode(payload))
    except (IndexError, ValueError):
        return []

    # claim doesnt exist at all if the user isnt in any group -> empty list
    groups = claims.get("cognito:groups", [])
    return groups if isinstance(groups, list) else []


def handler(event, context):
    # NEVER log the password or the tokens, CloudWatch keeps everything
    body = parse_body(event)
    username = body.get("username")
    password = body.get("password")

    if not isinstance(username, str) or not username.strip() or not isinstance(password, str) or not password:
        return respond(400, {"message": "username and password are required."})

    try:
        # USER_PASSWORD_AUTH -> plain username + password straight to Cognito
        # only works because we turned it on in explicit_auth_flows on the app client
        result = cognito.initiate_auth(
            AuthFlow="USER_PASSWORD_AUTH",
            ClientId=CLIENT_ID,
            AuthParameters={"USERNAME": username, "PASSWORD": password},
        )
    except ClientError as err:
        code = err.response["Error"]["Code"]
        if code in ("NotAuthorizedException", "UserNotFoundException"):
            return respond(401, {"message": INVALID_CREDENTIALS})
        print(f"Login failed: {code}")  # only the error type, nothing from the request
        return respond(500, {"message": "Internal error."})
    except Exception as err:
        print(f"Login failed: {type(err).__name__}")
        return respond(500, {"message": "Internal error."})

    # Cognito wants something else before it gives us tokens
    # e.g. NEW_PASSWORD_REQUIRED if the user was made without --permanent
    # we dont support any of these in the demo -> just tell the caller what it was
    challenge = result.get("ChallengeName")
    if challenge:
        return respond(409, {
            "message": f"Login requires an extra step that this demo does not support: {challenge}.",
            "challenge": challenge,
        })

    auth = result["AuthenticationResult"]
    return respond(200, {
        "idToken": auth["IdToken"],
        "accessToken": auth["AccessToken"],
        "expiresIn": auth["ExpiresIn"],  # seconds, 3600 by default
        "groups": groups_from_id_token(auth["IdToken"]),
    })
