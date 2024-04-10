targetScope = 'resourceGroup'

@description('The name of the App Service')
param appServiceName string

@description('The Azure region for the resources')
param location string

@description('The SKU of the App Service Plan')
param appServicePlanSku string

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'plan-${appServiceName}'
  location: location
  sku: {
    name: appServicePlanSku
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: appServiceName
  location: location
  kind: 'app,linux,container'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
      ]
      scmType: 'None'
      ftpsState: 'Disabled'
    }
  }
}
