variable "application_name" {
  type        = string
  description = "The name of your application"
}

variable "application_url" {
  type        = string
  description = "The URL of your application"
}

variable "environment" {
  type        = string
  description = "The environment (dev, test, prod...)"
  default     = "dev"
}

variable "auth0_domain" {
  type        = string
  description = "The Auth0 domain"
}

variable "auth0_client_id" {
  type        = string
  description = "The Auth0 client ID"
}

variable "auth0_client_secret" {
  type        = string
  description = "The Auth0 client secret"
}
