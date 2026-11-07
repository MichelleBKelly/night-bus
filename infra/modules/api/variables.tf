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
