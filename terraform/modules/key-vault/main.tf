terraform {
  required_providers {
    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "1.2.26"
    }
  }
}

resource "azurecaf_name" "key_vault" {
  random_length = "15"
  resource_type = "azurerm_key_vault"
  suffixes      = [var.environment]
}

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "application" {
  name                       = azurecaf_name.key_vault.result
  resource_group_name        = var.resource_group
  location                   = var.location
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days = 90
  sku_name                   = "standard"
  tags = {
    "environment"      = var.environment
    "application-name" = var.application_name
  }
}

resource "azurerm_key_vault_access_policy" "client" {
  key_vault_id = azurerm_key_vault.application.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id
  secret_permissions = [
    "Set",
    "Get",
    "List",
    "Delete",
    "Purge",
  ]
}

resource "azurerm_key_vault_access_policy" "owners" {
  key_vault_id = azurerm_key_vault.application.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = "9be3f6f6-81d4-438d-bc0d-83d8955175cf"
  secret_permissions = [
    "Get",
    "List",
  ]
}

resource "azurerm_key_vault_secret" "database_username" {
  name         = "database-username"
  value        = var.database_username
  key_vault_id = azurerm_key_vault.application.id
  depends_on   = [azurerm_key_vault_access_policy.client]
}

resource "azurerm_key_vault_secret" "database_password" {
  name         = "database-password"
  value        = var.database_password
  key_vault_id = azurerm_key_vault.application.id
  depends_on   = [azurerm_key_vault_access_policy.client]
}

resource "azurerm_key_vault_secret" "auth0_secret" {
  name         = "auth0-secret"
  value        = var.auth0_secret
  key_vault_id = azurerm_key_vault.application.id
  depends_on   = [azurerm_key_vault_access_policy.client]
}

resource "azurerm_key_vault_secret" "auth0_issuer_base_url" {
  name         = "auth0-issuer-base-url"
  value        = var.auth0_issuer_base_url
  key_vault_id = azurerm_key_vault.application.id
  depends_on   = [azurerm_key_vault_access_policy.client]
}

resource "azurerm_key_vault_secret" "auth0_client_id" {
  name         = "auth0-client-id"
  value        = var.auth0_client_id
  key_vault_id = azurerm_key_vault.application.id
  depends_on   = [azurerm_key_vault_access_policy.client]
}

resource "azurerm_key_vault_secret" "auth0_client_secret" {
  name         = "auth0-client-secret"
  value        = var.auth0_client_secret
  key_vault_id = azurerm_key_vault.application.id
  depends_on   = [azurerm_key_vault_access_policy.client]
}
