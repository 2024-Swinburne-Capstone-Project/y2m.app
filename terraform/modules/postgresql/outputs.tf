output "database_url" {
  value       = "postgres://${var.administrator_login}:${random_password.password.result}@${azurerm_postgresql_flexible_server.database.fqdn}:5432/${azurerm_postgresql_flexible_server_database.database.name}?sslmode=require"
  description = "The PostgreSQL server URL with password."
  sensitive   = true
}

output "database_username" {
  value       = var.administrator_login
  description = "The PostgreSQL server user name."
}

output "database_password" {
  value       = random_password.password.result
  sensitive   = true
  description = "The PostgreSQL server password."
}
