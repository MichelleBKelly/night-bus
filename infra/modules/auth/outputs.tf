output "user_pool_id" {
  description = "ID of the Cognito user pool."
  value       = aws_cognito_user_pool.this.id
}

output "user_pool_arn" {
  description = "ARN of the Cognito user pool."
  value       = aws_cognito_user_pool.this.arn
}

output "user_pool_client_id" {
  description = "ID of the Cognito app client used for login."
  value       = aws_cognito_user_pool_client.this.id
}

output "login_function_arn" {
  description = "ARN of the login Lambda function."
  value       = aws_lambda_function.login.arn
}

output "login_function_name" {
  description = "Name of the login Lambda function."
  value       = aws_lambda_function.login.function_name
}
