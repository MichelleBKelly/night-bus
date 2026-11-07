# Default cofig
terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.8"
    }
  }
}

resource "aws_cognito_user_pool" "this" {
  name = "${var.name_prefix}-users"

  # No self sign-up: only admins can create users.
  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "aws_cognito_user_group" "this" {
  for_each = toset(["admin", "driver", "member"])

  name         = each.key
  user_pool_id = aws_cognito_user_pool.this.id
}

# App client used by the login Lambda (username/password only).
resource "aws_cognito_user_pool_client" "this" {
  name            = "${var.name_prefix}-login"
  user_pool_id    = aws_cognito_user_pool.this.id
  generate_secret = false

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
  ]
}

# Login Lambda
data "archive_file" "login" {
  type        = "zip"
  source_dir  = "${path.module}/src"
  output_path = "${path.root}/.terraform/tmp/auth-login.zip"
}

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "login" {
  name               = "${var.name_prefix}-login-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy_attachment" "login_basic" {
  role       = aws_iam_role.login.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "login" {
  function_name    = "${var.name_prefix}-login"
  role             = aws_iam_role.login.arn
  runtime          = "nodejs22.x"
  handler          = "index.handler"
  filename         = data.archive_file.login.output_path
  source_code_hash = data.archive_file.login.output_base64sha256

  environment {
    variables = {
      USER_POOL_CLIENT_ID = aws_cognito_user_pool_client.this.id
    }
  }
}
