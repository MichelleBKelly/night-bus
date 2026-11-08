variable "name_prefix" {
  description = "Prefix used for resource names, e.g. night-bus-dev."
  type        = string
}

variable "user_pool_arn" {
  description = "ARN of the Cognito user pool from the accounts module."
  type        = string
}

variable "user_pool_id" {
  description = "ID of the Cognito user pool from the accounts module."
  type        = string
}

variable "user_pool_client_id" {
  description = "Cognito app client ID for the Gateway authorizer"
  type        = string
}

variable "login_function_arn" {
  description = "ARN of the login Lambda from the auth module (used for the POST /login integration)."
  type        = string
}

variable "login_function_name" {
  description = "Name of the login Lambda from the auth module (used for the invoke permission)."
  type        = string
}
