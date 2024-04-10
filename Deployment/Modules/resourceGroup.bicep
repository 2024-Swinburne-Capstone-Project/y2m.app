targetScope = 'subscription'

@description('The name of the resource group')
param resourceGroupName string

@description('The Azure region for the resource group')
param location string


resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}
