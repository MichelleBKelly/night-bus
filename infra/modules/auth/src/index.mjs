// Login handler for API Gateway (proxy integration).
// Body: { "username": "...", "password": "..." }
// Never log passwords or tokens.
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({});
const CLIENT_ID = process.env.USER_POOL_CLIENT_ID;

const INVALID_CREDENTIALS = "Incorrect username or password.";

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function parseBody(event) {
  if (!event || !event.body) return {};
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

// Read the cognito:groups claim from the ID token payload (no signature
// check needed: the token came straight from Cognito in this call).
function groupsFromIdToken(idToken) {
  try {
    const payload = JSON.parse(
      Buffer.from(idToken.split(".")[1], "base64url").toString("utf8")
    );
    const groups = payload["cognito:groups"];
    return Array.isArray(groups) ? groups : [];
  } catch {
    return [];
  }
}

export const handler = async (event) => {
  const { username, password } = parseBody(event);

  if (
    typeof username !== "string" || username.trim() === "" ||
    typeof password !== "string" || password === ""
  ) {
    return respond(400, { message: "username and password are required." });
  }

  try {
    const result = await client.send(
      new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: { USERNAME: username, PASSWORD: password },
      })
    );

    if (result.ChallengeName) {
      return respond(409, {
        message: `Login requires an extra step that this demo does not support: ${result.ChallengeName}.`,
        challenge: result.ChallengeName,
      });
    }

    const auth = result.AuthenticationResult;
    return respond(200, {
      idToken: auth.IdToken,
      accessToken: auth.AccessToken,
      expiresIn: auth.ExpiresIn,
      groups: groupsFromIdToken(auth.IdToken),
    });
  } catch (err) {
    if (
      err.name === "NotAuthorizedException" ||
      err.name === "UserNotFoundException"
    ) {
      return respond(401, { message: INVALID_CREDENTIALS });
    }
    // Log only the error type, never the request body.
    console.error("Login failed:", err.name);
    return respond(500, { message: "Internal error." });
  }
};
