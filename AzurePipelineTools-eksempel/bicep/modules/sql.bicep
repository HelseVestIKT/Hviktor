param dbServerMIName string
param tags object
param simpleDbName string
param location string // Eks: Norway East

resource dbServer_resource 'Microsoft.Sql/servers@2021-02-01-preview' = {
  name: dbServerMIName
  location: location 
}

resource simple_sqlDb 'Microsoft.Sql/servers/databases@2021-02-01-preview' = {
  parent: dbServer_resource
  name: simpleDbName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    collation:'SQL_Latin1_General_CP1_CI_AS' 
  }
  tags: tags
}

// sender connectionstring til parent som er i simple scope, for lagring til keyvault i rett resource group
//output simpleSqlConnectionStringSecret string = 'Data Source=tcp:${dbServer_resource.properties.fullyQualifiedDomainName},1433;Initial Catalog=${simpleDbName};User Id=${dbServer_resource.properties.administratorLogin}@${dbServer_resource.properties.fullyQualifiedDomainName};Password=${saAdminPwd};'

// sender connectionstring og sql server fqdn til parent som er i genetikkportal scope, for lagring til keyvault i rett resource group
output simpleSqlConnectionString string = 'Server=tcp:${dbServer_resource.properties.fullyQualifiedDomainName},1433;Authentication=Active Directory Default;Database=${simpleDbName};'                                                                                               
output simpleSqlFQDN string = dbServer_resource.properties.fullyQualifiedDomainName
