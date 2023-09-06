IF EXISTS (SELECT 1 FROM sys.database_principals WHERE name = '$(AppServiceName)')
BEGIN
        Print 'User $(AppServiceName) already exists in database'
END
ELSE
BEGIN
        Print 'Creating user $(AppServiceName) in database'
        CREATE USER "$(AppServiceName)" FROM EXTERNAL PROVIDER                      
END
ALTER ROLE db_datareader ADD MEMBER "$(AppServiceName)";
ALTER ROLE db_datawriter ADD MEMBER "$(AppServiceName)";
ALTER ROLE db_ddladmin ADD MEMBER "$(AppServiceName)";
ALTER ROLE db_owner ADD MEMBER "$(AppServiceName)";