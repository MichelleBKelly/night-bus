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
