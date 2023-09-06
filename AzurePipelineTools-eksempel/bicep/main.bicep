// ****************************************
// Azure Bicep main template
// This bicep template demonstrates deploying pf ASP.NET website using .NET 5.0
// NB! Accesses multiple resourcegroups, and is based on ever RG is located in same location
// NB! DO NOT delete RG, den må ligge/opprettes manuelt i hvert miljø: HVI-UTVIKLING-DEV-Simple-rg
// App service plan - bruker felles appservciceplan for alle ressurser innenfor en subscription for å kunne benytte appsubnet til å nå databaseserver
// App insights - ok module appInsights.bicep

// SQL Server
// 1 - SQL databaser foreløpig
// - simple
// 2 appservicer:
// - API
// - Web app


// ****************************************
targetScope = 'resourceGroup'

//parameters
param appServicePlanId string = ''
param environment string = ''
param applicationName string = 'simple-solli'

param subscriptionId string = subscription().subscriptionId
param location string = resourceGroup().location // Eks: Norway East
param fellesResourceGroupName string
param dbServerMIName string = ''
param storageAccountName string
param corsOrigin string = '*'

param b2cTenantNameParam string = ''
param apiB2CSUSIPolicy string = ''
param apiB2CRedirectApiUri string = ''
param apiB2CRedirectAppUri string = ''
param apiB2CClientIdParam string = ''
param apiB2CAppClientIdParam string = ''
param apiB2CTenantIdParam string = ''
param apiappSettingsAppIdParam string = ''
@secure()
param apiappSettingsClientSecretParam string = ''
param apiappSettingsExtensionAppClientIdParam string = ''

//frontend environmentvariable
param environmentVariableClientIdParam string = ''
param appRedirectUriParam string = ''

// SmtpSettings
param ApiClientId string = ''

@secure()
param ClientSecret string = ''
param Authority string = ''
param Scope string = ''
param GraphBaseAddress string = ''
param NotificationMail string = ''
param Sender string = ''
param Subject string = ''
param MailboxObjectId string = ''

param Logo string = ''
param InviteTemplateUrl string = ''

//admin
param adminapiSettingsClientIdParam string = ''

param hviLogAnalyticsNameParam string //Bruker bare Id, men lar navnet ligge her slik at vi vet navnet på log analytics spacet vi logger til
//Funker ikke p.t., mulig vi ikke har tilgang der med simple? Fungerer for genetikkportalen
param hviLogAnalyticsIdParam string = ''

param resourceTags object = {
  'Application': 'Simple'
  'DeploymentDate': utcNow('dd-MMM-yyyy')
  'createdBy': 'Simple azure pipeline'
}

//variables
var simpleDbName = '${applicationName}-db${environment}'
var appInsightsName = '${applicationName}${environment}-appinsights'

module sqlDbModule './modules/sql.bicep' = {
  name: 'sqlDbDeploy'
  scope: resourceGroup(subscription().subscriptionId, fellesResourceGroupName)
  params: {
    dbServerMIName: dbServerMIName
    simpleDbName: simpleDbName  
    location: location  
    tags: resourceTags
  }
}

module appInsightsModule 'modules/appInsights.bicep' = {
  name: 'appInsightsDeploy'
  params: {
    appInsightsName: appInsightsName
    location: location
    tags: resourceTags
  }
}

var appInsightsInstrumentationKey = appInsightsModule.outputs.appInsightsInstrumentationKey
var simpleSQLConnectionString = sqlDbModule.outputs.simpleSqlConnectionString

// web app - API
resource apiAppService 'Microsoft.Web/sites@2021-01-01' = {
  name: '${applicationName}-api${environment}'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  tags: resourceTags

  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: false
    siteConfig: {
      minTlsVersion: '1.2'
      netFrameworkVersion: 'V5.0'
      connectionStrings: [
        {          
          name: 'SimpleDb'
          connectionString: simpleSQLConnectionString
          type: 'SQLServer'
        }
      ]
      cors: {
        allowedOrigins: [
          corsOrigin
        ]
      }
      // documentaion of the different appsettings: https://docs.microsoft.com/en-us/azure/azure-monitor/app/azure-web-apps?tabs=net
      appSettings: [
        {
          name: 'appSettings:TenantId'
          value: '${b2cTenantNameParam}.onmicrosoft.com'
        }    
        {
          name: 'appSettings:AppId'
          value: apiappSettingsAppIdParam
        }   
        {
          name: 'appSettings:ClientSecret'
          value: apiappSettingsClientSecretParam
        }   
        {
          name: 'appSettings:B2cExtensionAppClientId'
          value: apiappSettingsExtensionAppClientIdParam
        }   
        {
          name: 'AzureAdB2C:Instance'
          value: 'https://${b2cTenantNameParam}.b2clogin.com'
        }      
        {
          name: 'AzureAdB2C:ClientId'
          value: apiB2CClientIdParam
        }      
        {
          name: 'AzureAdB2C:AppClientId'
          value: apiB2CAppClientIdParam
        }
        {
          name: 'AzureAdB2C:Domain'
          value: '${b2cTenantNameParam}.onmicrosoft.com'
        } 
        {
          name: 'AzureAdB2C:TenantId'
          value: apiB2CTenantIdParam
        }
        {
          name: 'AzureAdB2C:RedirectAppUri'
          value: apiB2CRedirectAppUri
        }
        {
          name: 'AzureAdB2C:RedirectApiUri'
          value: apiB2CRedirectApiUri
        }
        {
          name: 'AzureAdB2C:SignUpSignInPolicyId'
          value: apiB2CSUSIPolicy
        }
        {
          name: 'GraphMail:Sender'
          value: Sender
        }
        {
          name: 'GraphMail:Subject'
          value: Subject
        }
        {
          name: 'GraphMail:ApiClientId'
          value: ApiClientId
        }
        {
          name: 'GraphMail:MailboxObjectId'
          value: MailboxObjectId
        }
        {
          name: 'GraphMail:ClientSecret'
          value: ClientSecret
        }
        {
          name: 'GraphMail:Authority'
          value: Authority
        }
        {
          name: 'GraphMail:Scope'
          value: Scope
        }
        {
          name: 'GraphMail:GraphBaseAddress'
          value: GraphBaseAddress
        }      
        {
          name: 'GraphMail:NotificationMail'
          value: NotificationMail
        }
        {
          name: 'GraphMail:Logo'
          value: Logo
        }
        {
          name: 'GraphMail:InviteTemplateUrl'
          value: InviteTemplateUrl
        }
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
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: 'InstrumentationKey=${appInsightsInstrumentationKey};IngestionEndpoint=https://norwayeast-0.in.applicationinsights.azure.com/'
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

// web app - WEB
resource webAppService 'Microsoft.Web/sites@2021-01-01' = {
  name: '${applicationName}${environment}'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  tags: resourceTags

  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: false
    siteConfig: {
      minTlsVersion: '1.2'
      netFrameworkVersion: 'V5.0'
      cors: {
        allowedOrigins: [
          corsOrigin
        ]
      }
      appSettings: [   
        {
          name: 'appSettings:TenantId'
          value: '${b2cTenantNameParam}.onmicrosoft.com'
        }    
        {
          name: 'appSettings:AppId'
          value: apiappSettingsAppIdParam
        }   
        {
          name: 'appSettings:ClientSecret'
          value: apiappSettingsClientSecretParam
        }   
        {
          name: 'appSettings:B2cExtensionAppClientId'
          value: apiappSettingsExtensionAppClientIdParam
        }   
        {
          name: 'AzureAdB2C:Instance'
          value: 'https://${b2cTenantNameParam}.b2clogin.com'
        }      
        {
          name: 'AzureAdB2C:ClientId'
          value: apiB2CClientIdParam
        }      
        {
          name: 'AzureAdB2C:AppClientId'
          value: apiB2CAppClientIdParam
        }
        {
          name: 'AzureAdB2C:Domain'
          value: '${b2cTenantNameParam}.onmicrosoft.com'
        } 
        {
          name: 'AzureAdB2C:TenantId'
          value: apiB2CTenantIdParam
        }    
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
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: 'InstrumentationKey=${appInsightsInstrumentationKey};IngestionEndpoint=https://norwayeast-0.in.applicationinsights.azure.com/'
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

// web app - Admin
resource adminAppService 'Microsoft.Web/sites@2021-01-01' = {
  name: '${applicationName}-admin${environment}'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  tags: resourceTags

  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: false
    siteConfig: {
      minTlsVersion: '1.2'
      netFrameworkVersion: 'V5.0'
      connectionStrings: [
        {          
          name: 'SimpleDb'
          connectionString: simpleSQLConnectionString
          type: 'SQLServer'
        }
      ]
      // documentaion of the different appsettings: https://docs.microsoft.com/en-us/azure/azure-monitor/app/azure-web-apps?tabs=net
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
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: 'InstrumentationKey=${appInsightsInstrumentationKey};IngestionEndpoint=https://norwayeast-0.in.applicationinsights.azure.com/'
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
        {
          name: 'appSettings:TenantId'
          value: '${b2cTenantNameParam}.onmicrosoft.com'
        }    
        {
          name: 'appSettings:AppId'
          value: apiappSettingsAppIdParam
        }   
        {
          name: 'appSettings:ClientSecret'
          value: apiappSettingsClientSecretParam
        }   
        {
          name: 'appSettings:B2cExtensionAppClientId'
          value: apiappSettingsExtensionAppClientIdParam
        }   
        {
          name: 'AzureAdB2C:Instance'
          value: 'https://${b2cTenantNameParam}.b2clogin.com'
        }      
        {
          name: 'AzureAdB2C:ClientId'
          value: adminapiSettingsClientIdParam
        }            
        {
          name: 'AzureAdB2C:Domain'
          value: '${b2cTenantNameParam}.onmicrosoft.com'
        } 
        {
          name: 'AzureAdB2C:TenantId'
          value: apiB2CTenantIdParam
        }
   
      ]
    }
  }
}

// storage account
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {   
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Allow'
    }
    encryption: {
      keySource: 'Microsoft.Storage'
      services: {
        blob: {
          enabled: true
        }
        file: {
          enabled: true
        }
        queue: {
          enabled: true
        }
        table: {
          enabled: true
        }
      }
    }
    accessTier: 'Cool'
  }
  tags: resourceTags
  resource blobService 'blobServices' = {
    name: 'default'

    properties:{
      cors:{
        corsRules:[
          {
            allowedMethods: [
              'GET'
              'OPTIONS'
            ]
            allowedOrigins: [
              'https://hvisandbox.b2clogin.com'
              'https://helsevestlogindev.b2clogin.com'
              'https://helsevestlogintest.b2clogin.com'
              'https://helsevestlogin.b2clogin.com'
            ]
            exposedHeaders: [
              '*'
            ]
            allowedHeaders: [
              '*'
            ]
            maxAgeInSeconds: 200
          }
        ]
      }
    }

    resource content 'containers' = {
      name: 'content'
    }
    resource static 'containers' = {
      name: 'root'
      properties: {
        publicAccess: 'Container'
      }
    }
  }
}


//Diagnostic settings for webapp til felles log analytics workspace HVI-LogAnalyticsWorkspace
//Funker ikke p.t.
resource diagnosticSetting 'microsoft.insights/diagnosticSettings@2017-05-01-preview' = {
   scope: apiAppService  
   name: apiAppService.name
   properties: {
     workspaceId: hviLogAnalyticsIdParam
     logs: [
      {
        category: 'AppServiceAppLogs'
        enabled: true        
      }
      {
        category: 'AppServiceConsoleLogs'
        enabled: true        
      }
     ]   
   }
}
output webAppName string = webAppService.name
output apiAppName string = apiAppService.name
output adminAppName string = adminAppService.name
output webURL string = webAppService.properties.defaultHostName
output webApiURL string = apiAppService.properties.defaultHostName
output webAdminURL string = adminAppService.properties.defaultHostName
output applicationStorageName string = storageAccount.name
output simpleConnectionString string = simpleSQLConnectionString
output sqlServerFullyQualifiedDomainName string = sqlDbModule.outputs.simpleSqlFQDN
output dbName string = simpleDbName
output b2cTenant string = b2cTenantNameParam
output b2cClientId string = environmentVariableClientIdParam
output appRedirectUri string = appRedirectUriParam
