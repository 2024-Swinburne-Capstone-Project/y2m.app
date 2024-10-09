output "azure_storage_connection_string" {
  description = "Azure Storage Connection String"
  value       = "DefaultEndpointsProtocol=https;AccountName=${azurerm_storage_account.storage.name};AccountKey=${azurerm_storage_account.storage.primary_access_key};EndpointSuffix=core.windows.net"
  sensitive   = true
}