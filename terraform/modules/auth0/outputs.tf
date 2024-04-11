output "auth0_client_id" {
  value = auth0_client.auth_client.client_id
}

output "auth0_client_secret" {
  value     = auth0_client_credentials.client_secret.client_secret
  sensitive = true
}

output "auth0_secret" {
  value     = random_string.random_64bit.result
  sensitive = true
}