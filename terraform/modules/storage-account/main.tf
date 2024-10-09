terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.90.0"
    }
    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "1.2.26"
    }
  }
}

resource "azurecaf_name" "storage_account" {
  name          = var.application_name
  resource_type = "azurerm_storage_account"
  suffixes      = [var.environment]
}

resource "azurerm_storage_account" "storage" {
  name                             = azurecaf_name.storage_account.result
  resource_group_name              = var.resource_group
  location                         = var.location
  account_tier                     = "Standard"
  account_replication_type         = "RAGRS"
  account_kind                     = "StorageV2"
  min_tls_version                  = "TLS1_2"
  allow_nested_items_to_be_public  = true
  cross_tenant_replication_enabled = false

  blob_properties {
    delete_retention_policy {
      days = 7
    }
    container_delete_retention_policy {
      days = 7
    }
  }

  tags = {
    environment      = var.environment
    application-name = var.application_name
  }
}

resource "azurerm_storage_container" "profilepics" {
  name                  = "profilepics"
  storage_account_name  = azurerm_storage_account.storage.name
  container_access_type = "container"
}