FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /app

RUN ls -la
# 2. Copy necessary files
COPY *.csproj .
RUN dotnet restore

# 3. Copy the rest of the files and build
COPY . .
RUN dotnet publish -c Release -o out


EXPOSE 5000 5001

CMD ["dotnet", "out/ManagerUsers.Api.dll"]