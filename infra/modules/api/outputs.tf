output "api_url" {
  description = "Invoke URL for the API Gateway. Give this to the website module."
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "api_id" {
  description = "ID of the API Gateway."
  value       = aws_apigatewayv2_api.api.id
}

output "l2_function_name" {
  description = "Name of the L2 Handle Requests Lambda."
  value       = aws_lambda_function.l2.function_name
}

output "authorizer_id" {
  description = "ID of the Cognito JWT authorizer, for other modules' routes."
  value       = aws_apigatewayv2_authorizer.cognito.id
}

output "execution_arn" {
  description = "Execution ARN of the API Gateway, for Lambda invoke permissions."
  value       = aws_apigatewayv2_api.api.execution_arn
}
