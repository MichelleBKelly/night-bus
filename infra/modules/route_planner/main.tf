terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "${var.name_prefix}-route-planner-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [{
      Effect = "Allow"

      Principal = {
        Service = "lambda.amazonaws.com"
      }

      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "geo_routes" {
  name = "${var.name_prefix}-geo-routes"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "geo-routes:OptimizeWaypoints",
          "geo-routes:CalculateRoutes"
        ]

        Resource = "arn:aws:geo-routes:us-east-2::provider/default"
      },
      {
        Effect = "Allow"

        Action = [
          "geo-places:Geocode"
        ]

        Resource = "arn:aws:geo-places:us-east-2::provider/default"
      }
    ]
  })
}

resource "aws_lambda_function" "route_planner" {
  function_name = "${var.name_prefix}-route-planner"
  role          = aws_iam_role.lambda_exec.arn

  runtime = "python3.12"
  handler = "handler.lambda_handler"

  filename         = "${path.root}/../../../build/route_planner.zip"
  source_code_hash = filebase64sha256("${path.root}/../../../build/route_planner.zip")

  memory_size = 256
  timeout     = 30

  depends_on = [
    aws_iam_role_policy_attachment.logs,
    aws_iam_role_policy.geo_routes
  ]
}