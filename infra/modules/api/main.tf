resource "aws_dynamodb_table" "trips" {
  name         = "${var.name_prefix}-trips"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "tripId"

  attribute {
    name = "tripId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "members" {
  name         = "${var.name_prefix}-members"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "memberId"

  attribute {
    name = "memberId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "drivers" {
  name         = "${var.name_prefix}-drivers"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "driverId"

  attribute {
    name = "driverId"
    type = "S"
  }
}

# --- Lambda role ---
resource "aws_iam_role" "l2_role" {
  name = "${var.name_prefix}-l2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "l2_basic" {
  role       = aws_iam_role.l2_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# NEW: let L2 read/write ONLY these 3 tables, nothing else.
resource "aws_iam_role_policy" "l2_dynamodb" {
  name = "${var.name_prefix}-l2-dynamodb"
  role = aws_iam_role.l2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ]
      Resource = [
        aws_dynamodb_table.trips.arn,
        aws_dynamodb_table.members.arn,
        aws_dynamodb_table.drivers.arn
      ]
    }]
  })
}

data "archive_file" "l2_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "l2" {
  function_name    = "${var.name_prefix}-l2"
  role             = aws_iam_role.l2_role.arn
  handler          = "source.lambda_handler"
  runtime          = "python3.13"
  filename         = data.archive_file.l2_zip.output_path
  source_code_hash = data.archive_file.l2_zip.output_base64sha256
  timeout          = 10
  memory_size      = 256

  environment {
    variables = {
      TRIPS_TABLE   = aws_dynamodb_table.trips.name
      MEMBERS_TABLE = aws_dynamodb_table.members.name
      DRIVERS_TABLE = aws_dynamodb_table.drivers.name
      USER_POOL_ID  = var.user_pool_id
    }
  }
}

# --- API Gateway, same as mock version ---
resource "aws_apigatewayv2_api" "api" {
  name          = "${var.name_prefix}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
  }
}

resource "aws_apigatewayv2_authorizer" "cognito" {
  api_id           = aws_apigatewayv2_api.api.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "${var.name_prefix}-authorizer"

  jwt_configuration {
    audience = [var.user_pool_client_id]
    issuer   = "https://cognito-idp.ca-central-1.amazonaws.com/${var.user_pool_id}"
  }
}

resource "aws_apigatewayv2_integration" "l2" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.l2.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "proxy" {
  api_id             = aws_apigatewayv2_api.api.id
  route_key          = "ANY /{proxy+}"
  target             = "integrations/${aws_apigatewayv2_integration.l2.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

resource "aws_apigatewayv2_route" "root" {
  api_id             = aws_apigatewayv2_api.api.id
  route_key          = "ANY /"
  target             = "integrations/${aws_apigatewayv2_integration.l2.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "allow_apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.l2.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# --- Public login: POST /login -> auth module's login Lambda (no JWT, it hands out the JWT) ---
resource "aws_apigatewayv2_integration" "login" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.login_function_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "login" {
  api_id             = aws_apigatewayv2_api.api.id
  route_key          = "POST /login"
  target             = "integrations/${aws_apigatewayv2_integration.login.id}"
  authorization_type = "NONE"
}

resource "aws_lambda_permission" "allow_apigw_login" {
  statement_id  = "AllowAPIGatewayLogin"
  action        = "lambda:InvokeFunction"
  function_name = var.login_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}
