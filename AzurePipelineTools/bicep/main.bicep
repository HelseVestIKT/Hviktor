// ****************************************
// Azure Bicep main template
// NB! Accesses multiple resourcegroups, and is based on ever RG is located in same location
// NB! DO NOT delete RG, den må ligge/opprettes manuelt i hvert miljø: HVI-UTVIKLING-DEV-Hviktor-rg
// App service plan - bruker felles appservciceplan for alle ressurser innenfor en subscription for å kunne benytte appsubnet til å nå databaseserver
// App insights - ok module appInsights.bicep
// - Web app


// ****************************************
targetScope = 'subscription'

//parameters
param appServicePlanId string = ''
param environment string = ''
param applicationName string = 'Hviktor'
param resourceGroupName string = ''
param location string = deployment().location
param hviLogAnalyticsIdParam string = ''
param allowIPParam string = ''

param resourceTags object = {
  'Application': 'Hviktor'
  'DeploymentDate': utcNow('dd-MMM-yyyy')
  'createdBy': 'Hviktor azure pipeline'
}

//variables
var appInsightsName = '${applicationName}${environment}-appinsights'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location  
}

module appInsightsModule 'modules/appInsights.bicep' = {
  name: 'appInsightsDeploy'
  scope: resourceGroup(rg.name)
  params: {
    appInsightsName: appInsightsName  
    tags: resourceTags
    location: location
  }
}

// web app - WEB
module webAppServiceModule 'modules/webAppService.bicep' = {
    name: '${applicationName}${environment}Deploy'  
    scope: resourceGroup(rg.name)  
    params: {
      applicationName: '${applicationName}${environment}'  
      tags: resourceTags
      appInsightsInstrumentationKey: appInsightsModule.outputs.appInsightsInstrumentationKey
      appServicePlanId: appServicePlanId  
      location: location 
      allowIPParam: allowIPParam       
    }
    
}
output webAppName string = webAppServiceModule.outputs.webAppName
output webURL string = webAppServiceModule.outputs.webURL
