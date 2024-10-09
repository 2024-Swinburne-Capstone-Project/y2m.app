terraform {
  required_providers {
    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "1.2.26"
    }
  }
}

resource "azurecaf_name" "app_service_plan" {
  name          = var.application_name
  resource_type = "azurerm_app_service_plan"
  suffixes      = [var.environment]
}

# This creates the plan that the service use
resource "azurerm_service_plan" "application" {
  name                = azurecaf_name.app_service_plan.result
  resource_group_name = var.resource_group
  location            = var.location

  sku_name = "F1"
  os_type  = "Linux"

  tags = {
    "environment"      = var.environment
    "application-name" = var.application_name
  }
}

resource "azurecaf_name" "app_service" {
  name          = var.application_name
  resource_type = "azurerm_app_service"
  suffixes      = [var.environment]
}

# This creates the service definition
resource "azurerm_linux_web_app" "application" {
  name                = azurecaf_name.app_service.result
  resource_group_name = var.resource_group
  location            = var.location
  service_plan_id     = azurerm_service_plan.application.id
  https_only          = true

  tags = {
    "environment"      = var.environment
    "application-name" = var.application_name
  }

  site_config {
    application_stack {
      //The docker image, including tag, to be used. e.g. appsvc/staticsite:latest
      docker_image_name        = "${var.application_name}/${var.application_name}:${var.container_tag}"
      docker_registry_url      = "https://${var.container_registry_name}.azurecr.io"
      docker_registry_password = var.container_registry_password
      docker_registry_username = var.container_registry_username
    }
    always_on  = false
    ftps_state = "FtpsOnly"
  }

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "WEBSITES_PORT"                       = "3000"

    # These are app specific environment variables

    "DATABASE_URL"      = var.database_url
    "DATABASE_USERNAME" = var.database_username
    "DATABASE_PASSWORD" = var.database_password

    "AUTH0_CLIENT_ID"       = var.auth0_client_id
    "AUTH0_CLIENT_SECRET"   = var.auth0_client_secret
    "AUTH0_BASE_URL"        = "https://app-${var.application_name}-${var.environment}.azurewebsites.net"
    "AUTH0_ISSUER_BASE_URL" = var.auth0_issuer_base_url
    "AUTH0_SECRET"          = var.auth0_secret

    "AZURE_STORAGE_CONNECTION_STRING" = var.azure_storage_connection_string
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault_access_policy" "application" {
  key_vault_id = var.vault_id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_linux_web_app.application.identity[0].principal_id

  secret_permissions = [
    "Get",
    "List"
  ]
}
