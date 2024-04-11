terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 1.0.0"
    }
  }
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

resource "auth0_client" "auth_client" {
  name                = "${var.application_name}-${var.environment}"
  app_type            = "regular_web"
  callbacks           = ["${var.application_url}/api/auth/callback"]
  allowed_origins     = [var.application_url]
  allowed_logout_urls = [var.application_url]
  oidc_conformant     = true

  jwt_configuration {
    alg = "RS256"
  }
}

resource "random_string" "random_64bit" {
  length  = 64
  special = false
}

resource "auth0_client_credentials" "client_secret" {
  client_id = auth0_client.auth_client.id

  authentication_method = "client_secret_basic"
  client_secret         = random_string.random_64bit.result
}