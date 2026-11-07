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

provider "aws" {
  region = "ca-central-1"
}

module "website" {
  source = "../../modules/website"

  name_prefix = "night-bus-dev"
}

module "auth" {
  source = "../../modules/auth"

  name_prefix = "night-bus-dev"
}
