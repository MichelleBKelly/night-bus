variable "name_prefix" {
  type = string
}

variable "api_id" {
  description = "ID of the shared HTTP API (from the api module)."
  type        = string
}

variable "api_execution_arn" {
  description = "Execution ARN of the shared HTTP API (from the api module)."
  type        = string
}

variable "authorizer_id" {
  description = "ID of the Cognito JWT authorizer on the shared HTTP API."
  type        = string
}
