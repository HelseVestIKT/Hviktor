param resourceGroupName string
param location string = 'norwayeast'

targetScope = 'subscription'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location  
}

output resourceGroupCreated string = rg.name
output resourceGrouplocation string = rg.location
