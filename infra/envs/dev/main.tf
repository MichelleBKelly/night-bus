# Default config
terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "local" {}
}

# Define the server we are running on (Do not worry about backup servers)
provider "aws" {
  region = "ca-central-1"
}

## RUN OUR MODULES BELOW !!!!!
# TODO: Explain wat a module is
# Our modules are HIGHLY decoupled
module "website" {
  source = "../../modules/website"

  name_prefix  = "night-bus-dev"
  frontend_dir = "${path.module}/../../../frontend"
}

module "auth" {
  source = "../../modules/auth"

  name_prefix = "night-bus-dev"
}

module "api" {
  source = "../../modules/api"

  name_prefix         = "night-bus-dev"
  user_pool_arn       = module.auth.user_pool_arn
  user_pool_id        = module.auth.user_pool_id
  user_pool_client_id = module.auth.user_pool_client_id
  login_function_arn  = module.auth.login_function_arn
  login_function_name = module.auth.login_function_name
}

module "route_planner" {
  source = "../../modules/route_planner"

  name_prefix       = "night-bus-dev"
  api_id            = module.api.api_id
  api_execution_arn = module.api.execution_arn
  authorizer_id     = module.api.authorizer_id
}
