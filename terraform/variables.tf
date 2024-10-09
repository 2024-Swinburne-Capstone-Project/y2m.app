variable "application_name" {
  type        = string
  description = "The name of your application"
  default     = "y2m-app"
}

variable "terraform_storage_account" {
  type        = string
  description = "When using an Azure back-end, the name of the Azure Storage Account that stores the Terraform state"
  default     = ""
}

variable "environment" {
  type        = string
  description = "The environment (dev, test, prod...)"
  default     = ""
}

variable "location" {
  type        = string
  description = "The Azure region where all resources in this example should be created"
  default     = "australiasoutheast"
}

variable "auth0_issuer_base_url" {
  type        = string
  description = "The Auth0 issuer base URL"
}

variable "auth0_ci_client_id" {
  type        = string
  description = "The Auth0 CI client ID"
}

variable "auth0_ci_client_secret" {
  type        = string
  description = "The Auth0 CI client secret"
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
  default     = "latest"
}