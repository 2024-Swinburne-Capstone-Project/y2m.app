terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.72.0"
    }
    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "1.2.26"
    }
  }
  backend "azurerm" {}
}

provider "azurerm" {
  features {}
}

locals {
  // If an environment is set up (dev, test, prod...), it is used in the application name
  environment = var.environment == "" ? "dev" : var.environment
}

resource "azurecaf_name" "resource_group" {
  name          = var.application_name
  resource_type = "azurerm_resource_group"
  suffixes      = [local.environment]
}

resource "azurerm_resource_group" "main" {
  name     = azurecaf_name.resource_group.result
  location = var.location

  tags = {
    "terraform"        = "true"
    "environment"      = local.environment
    "application-name" = var.application_name
    "nubesgen-version" = "0.17.0"

    // Name of the Azure Storage Account that stores the Terraform state
    "terraform_storage_account" = var.terraform_storage_account
  }
}

module "application" {
  source           = "./modules/app-service"
  resource_group   = azurerm_resource_group.main.name
  application_name = var.application_name
  environment      = local.environment
  location         = var.location

  database_url      = module.database.database_url
  database_username = "@Microsoft.KeyVault(SecretUri=${module.key-vault.vault_uri}secrets/database-username)"
  database_password = "@Microsoft.KeyVault(SecretUri=${module.key-vault.vault_uri}secrets/database-password)"

  auth0_secret          = "@Microsoft.KeyVault(SecretUri=${module.key-vault.vault_uri}secrets/auth0-secret)"
  auth0_issuer_base_url = "@Microsoft.KeyVault(SecretUri=${module.key-vault.vault_uri}secrets/auth0-issuer-base-url)"
  auth0_client_id       = "@Microsoft.KeyVault(SecretUri=${module.key-vault.vault_uri}secrets/auth0-client-id)"
  auth0_client_secret   = "@Microsoft.KeyVault(SecretUri=${module.key-vault.vault_uri}secrets/auth0-client-secret)"

  vault_id = module.key-vault.vault_id
}

module "database" {
  source            = "./modules/postgresql"
  resource_group    = azurerm_resource_group.main.name
  application_name  = var.application_name
  environment       = local.environment
  location          = var.location
  high_availability = false
}

module "key-vault" {
  source           = "./modules/key-vault"
  resource_group   = azurerm_resource_group.main.name
  application_name = var.application_name
  environment      = local.environment
  location         = var.location

  database_username = module.database.database_username
  database_password = module.database.database_password

  auth0_client_id       = module.auth0.auth0_client_id
  auth0_client_secret   = module.auth0.auth0_client_secret
  auth0_secret          = module.auth0.auth0_secret
  auth0_issuer_base_url = var.auth0_issuer_base_url
}

module "auth0" {
  source              = "./modules/auth0"
  environment         = local.environment
  application_name    = var.application_name
  application_url     = module.application.application_url
  auth0_domain        = var.auth0_issuer_base_url
  auth0_client_id     = var.auth0_ci_client_id
  auth0_client_secret = var.auth0_ci_client_secret
}
