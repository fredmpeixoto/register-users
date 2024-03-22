FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /1 - register - api

ARG BUILD_CONFIGURATION=Debug
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true  
ENV ASPNETCORE_URLS=http://+:4000  
# 2. Copy necessary files
COPY . .
RUN dotnet restore 

# 3. Copy the rest of the files and build
COPY . .
RUN dotnet publish -c Release -o out


EXPOSE 4000 4001

CMD ["dotnet", "restore","&&" ,"dotnet","publish","-c Release -o out" ,"&&", "dotnet", "out/ManagerUsers.Api.dll"]