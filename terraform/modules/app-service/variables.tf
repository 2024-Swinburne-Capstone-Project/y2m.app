variable "resource_group" {
  type        = string
  description = "The resource group"
}

variable "application_name" {
  type        = string
  description = "The name of your application"
}

variable "environment" {
  type        = string
  description = "The environment (dev, test, prod...)"
  default     = "dev"
}

variable "location" {
  type        = string
  description = "The Azure region where all resources in this example should be created"
}

variable "database_url" {
  type        = string
  description = "The URL to the database"
}

variable "database_username" {
  type        = string
  description = "The database username"
}

variable "database_password" {
  type        = string
  description = "The database password"
}

variable "vault_id" {
  type        = string
  description = "The Azure Key Vault ID"
}

variable "auth0_secret" {
  type        = string
  description = "The Auth0 client secret"
}

variable "auth0_issuer_base_url" {
  type        = string
  description = "The Auth0 issuer base URL"
}

variable "auth0_client_id" {
  type        = string
  description = "The Auth0 client ID"
}

variable "auth0_client_secret" {
  type        = string
  description = "The Auth0 client secret"
}

variable "container_registry_name" {
  type        = string
  description = "The name of the container registry"
}

variable "container_registry_username" {
  type        = string
  description = "The username of the container registry"
}

variable "container_registry_password" {
  type        = string
  description = "The password of the container registry"
}
variable "container_tag" {
  type        = string
  description = "The tag of the container"
}

variable "azure_storage_connection_string" {
  type        = string
  description = "The connection string to the Azure Storage account"
}