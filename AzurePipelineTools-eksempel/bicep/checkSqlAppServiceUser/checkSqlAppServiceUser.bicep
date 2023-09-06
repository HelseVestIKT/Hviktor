// ****************************************
// Azure Bicep main template
// This bicep template demonstrates deploying pf ASP.NET website using .NET 5.0
// NB! Accesses multiple resourcegroups, and is based on ever RG is located in same location
// NB! DO NOT delete RG, den må ligge/opprettes manuelt i hvert miljø: HVI-UTVIKLING-DEV-Genetikkportalen-rg
// App service plan - bruker felles appservciceplan for alle ressurser innenfor en subscription for å kunne benytte appsubnet til å nå databaseserver
// App insights - ok module appInsights.bicep

// ****************************************
targetScope = 'resourceGroup'

//parameters
param env string = ''
param applicationName string = 'simple-solli'
param fellesResourceGroupName string

param subscriptionId string = subscription().subscriptionId
param location string = resourceGroup().location // Eks: Norway East
param dbServerMIName string = ''

param resourceTags object = {
  'Application': 'Simple'
  'DeploymentDate': utcNow('dd-MMM-yyyy')
  'createdBy': 'Simple azure pipeline'
}

//variables
var simpleDbName = '${applicationName}-db${environment}'

resource dbServer_resource 'Microsoft.Sql/servers@2021-02-01-preview' = {
  name: dbServerMIName
  scope: resourceGroup(subscriptionId, fellesResourceGroupName)
}

output apiAppName string = '${applicationName}-api${env}'
output sqlServerFullyQualifiedDomainName string = dbServer_resource.properties.fullyQualifiedDomainName
output dbName string = simpleDbName
