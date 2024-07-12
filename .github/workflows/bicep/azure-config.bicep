targetScope = 'resourceGroup'

//parameters
param appServicePlanId string
param environment string
param applicationName string
param resourceGroupName string
param location string
param allowIPParam string

param resourceTags object = {
  Application: 'Hviktor'
  createdBy: 'Morten'
}

//variables
var appInsightsName = 'hviktor-test-gh-appinsights-${environment}'

// resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
//   name: resourceGroupName
//   location: location  
// }

module appInsightsModule './modules/appInsights.bicep' = {
  name: 'appInsightsDeploy'
  scope: resourceGroup(resourceGroupName)
  params: {
    appInsightsName: appInsightsName  
    tags: resourceTags
    location: location
  }
}

// web app - WEB
module webAppServiceModule './modules/webAppService.bicep' = {
    name: '${applicationName}${environment}Deploy'  
    scope: resourceGroup(resourceGroupName)  
    params: {
      applicationName: applicationName
      tags: resourceTags
      appInsightsInstrumentationKey: appInsightsModule.outputs.appInsightsInstrumentationKey
      appServicePlanId: appServicePlanId  
      location: location 
      allowIPParam: allowIPParam       
    }
    
}
