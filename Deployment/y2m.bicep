targetScope = 'subscription'

@description('The ID of the Azure subscription')
param subscriptionId string = '3101c544-f25e-4156-ad81-3dcbe65a3b65'

@description('The name of the resource group')
param resourceGroupName string = 'y2m-rg'

@description('The name of the App Service')
param appServiceName string = 'y2m-app'

@description('The Azure region for the resources')
param location string = 'australiasoutheast'


module resourceGroupModule './Modules/resourceGroup.bicep' = {
  name: 'resourceGroupDeployment'
  params: {
    resourceGroupName: resourceGroupName
    location: location
  }
}

module storageAccount './Modules/storageAccount.bicep' = {
  name: 'storageAccountDeployment'
  scope: resourceGroup(subscriptionId)
  params: {
    storagePrefix: 'y2m'
    storageSKU: 'Standard_LRS'
    location: location
  }
  dependsOn: [
    resourceGroupModule
  ]
}

module appService './Modules/appService.bicep' = {
  name: 'appServiceDeployment'
  scope: resourceGroup(subscriptionId)
  params: {
    appServiceName: appServiceName
    location: location
    appServicePlanSku: 'F1'
  }
  dependsOn: [
    resourceGroupModule
  ]
}
