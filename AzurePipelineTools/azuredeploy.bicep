targetScope = 'subscription'

//parameters
param appServicePlanId string = '/subscriptions/470ca611-e54c-49b1-b5e5-07fcfb8c3c08/resourceGroups/HVI-UTVIKLING-DEV-FELLES-rg/providers/Microsoft.Web/serverfarms/HVI-UTVIKLING-DEV-dotnet5-AppServicePlan'
param environment string = 'Dev'
param applicationName string = 'Hviktor'
param resourceGroupName string = ''
//param location string = deployment().location
param location string = 'norwayeast'
//param hviLogAnalyticsIdParam string = ''
param allowIPParam string = ''

param resourceTags object = {
  'Application': 'Hviktor'
  'DeploymentDate': utcNow('dd-MMM-yyyy')
  'createdBy': 'Hviktor azure pipeline'
}

//variables
//var appInsightsName = '${applicationName}${environment}-appinsights'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location  
}
/*
module appInsightsModule 'modules/appInsights.bicep' = {
  name: 'appInsightsDeploy'
  scope: resourceGroup(rg.name)
  params: {
    appInsightsName: appInsightsName  
    tags: resourceTags
    location: location
  }
}
*/

// web app - WEB
module webAppServiceModule 'modules/webAppService.bicep' = {
    name: '${applicationName}${environment} Deploy'  
    scope: resourceGroup(rg.name)  
    params: {
      applicationName: '${applicationName}${environment}'  
      tags: resourceTags
      //appInsightsInstrumentationKey: appInsightsModule.outputs.appInsightsInstrumentationKey
      appServicePlanId: appServicePlanId  
      location: location 
      allowIPParam: allowIPParam       
    }
    
}
output webAppName string = webAppServiceModule.outputs.webAppName
output webURL string = webAppServiceModule.outputs.webURL
