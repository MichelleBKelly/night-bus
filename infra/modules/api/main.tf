# modules/api/main.tf
# No terraform {} / provider {} block here - those live in envs/dev/main.tf
# and are inherited. Team uses aws ~> 6.0, Terraform >= 1.6, region ca-central-1.
#
# Auth note: accounts module outputs user_pool_id and user_pool_arn (Cognito),
# NOT a login_function_arn. So there is no POST /login Lambda to wire.
# Login is Cognito: the website logs in with Cognito, gets a JWT, and sends
# Authorization: Bearer <jwt> to this API. The Gateway authorizer below
# needs a Cognito app client ID as its audience - accounts does not output
# one yet. Until accounts adds output "user_pool_client_id", this module
# ships WITHOUT the authorizer, and L2 returns mock data. Add the authorizer
# back in once that output exists - see the commented block at the bottom.

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

data "archive_file" "l2_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "l2" {
  function_name    = "${var.name_prefix}-l2"
  role             = aws_iam_role.l2_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.l2_zip.output_path
  source_code_hash = data.archive_file.l2_zip.output_base64sha256
  timeout          = 10
  memory_size      = 256

  environment {
    variables = {
      TABLE_NAME   = "${var.name_prefix}-trips"
      USER_POOL_ID = var.user_pool_id
    }
  }
}

resource "aws_apigatewayv2_api" "api" {
  name          = "${var.name_prefix}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
  }
}

resource "aws_apigatewayv2_integration" "l2" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.l2.invoke_arn
  payload_format_version = "2.0"
}

# ANY /{proxy+} sends every path to L2, so L2 does the routing.
resource "aws_apigatewayv2_route" "proxy" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.l2.id}"
}

resource "aws_apigatewayv2_route" "root" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /"
  target    = "integrations/${aws_apigatewayv2_integration.l2.id}"
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

# --- Add this once accounts outputs user_pool_client_id ---
# resource "aws_apigatewayv2_authorizer" "cognito" {
#   api_id           = aws_apigatewayv2_api.api.id
#   authorizer_type  = "JWT"
#   identity_sources = ["$request.header.Authorization"]
#   name             = "${var.name_prefix}-cognito"
#   jwt_configuration {
#     audience = [var.user_pool_client_id]
#     issuer   = "https://cognito-idp.ca-central-1.amazonaws.com/${var.user_pool_id}"
#   }
# }
# Then add authorization_type = "JWT" and authorizer_id = aws_apigatewayv2_authorizer.cognito.id
# to the proxy and root routes above.
