param tags object
param location string
param appInsightsInstrumentationKey string
param applicationName string
param appServicePlanId string
param allowIPParam string


resource webAppService 'Microsoft.Web/sites@2021-01-01' = {
  name: applicationName  
  identity: {
    type: 'SystemAssigned'
  }
  tags: tags
  location: location
  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: false
    siteConfig: {
      websiteTimeZone: 'Central Europe Standard Time'
      minTlsVersion: '1.2'
      netFrameworkVersion: 'V5.0'    
      ipSecurityRestrictions: [
      {
            ipAddress: allowIPParam
            action: 'Allow'            
            priority: 101
            name: 'Proxy'
            description: 'Only allow traffic from HVIKT proxy (for onpremise access)'
      }   
      ]
       appSettings: [       
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'APPINSIGHTS_PROFILERFEATURE_VERSION'
          value: '1.0.0'
        }
        {
          name: 'APPINSIGHTS_SNAPSHOTFEATURE_VERSION'
          value: '1.0.0'
        }        
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~2'
        }
        {
          name: 'DiagnosticServices_EXTENSION_VERSION'
          value: '~3'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_Mode'
          value: 'default'
        }   
        {
          name: 'WEBSITE_TIME_ZONE'
          value: 'W. Europe Standard Time'
        }          
      ]
    }
  }  
}

output webAppName string = webAppService.name
output webURL string = webAppService.properties.defaultHostName
