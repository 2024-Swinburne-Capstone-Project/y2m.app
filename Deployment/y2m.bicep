targetScope = 'resourceGroup'

@description('The name of the resource group')
param resourceGroupName string = 'y2m-rg'

@description('The name of the App Service')
param appServiceName string = 'y2m-app'

@description('The Azure region for the resources')
param location string = 'australiasoutheast'

module appService './Modules/appService.bicep' = {
  name: 'appServiceDeployment'
  scope: resourceGroup(resourceGroupName)
  params: {
    appServiceName: appServiceName
    location: location
    appServicePlanSku: 'F1'
  }
}
