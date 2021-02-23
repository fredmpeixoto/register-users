# register-users
Project to Inbev using aspnet.core 3.1 and angular 11

#Docker command to generator the server Database
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Helloworld123" -e "MSSQL_PID=Express" -p 1433:1433  --name sql1 -d mcr.microsoft.com/mssql/server:2017-latest

