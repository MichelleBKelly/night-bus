output "lambda_arn" {
  value = aws_lambda_function.route_planner.arn
}

output "lambda_name" {
  value = aws_lambda_function.route_planner.function_name
}
