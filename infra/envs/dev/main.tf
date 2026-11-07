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

  name_prefix = "night-bus-dev"
}

module "auth" {
  source = "../../modules/auth"

  name_prefix = "night-bus-dev"
}

module "api" {
  source = "../../modules/api"

  name_prefix   = "night-bus-dev"
  user_pool_arn = module.auth.user_pool_arn
  user_pool_id  = module.auth.user_pool_id
}