terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
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
