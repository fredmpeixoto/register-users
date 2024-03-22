# Use the official Microsoft SQL Server 2017 image from Docker Hub
FROM mcr.microsoft.com/mssql/server:2017-latest

# Set environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Helloworld123
ENV MSSQL_PID=Express

# Expose port 1433
EXPOSE 1433

# (Optional) You may add more commands if needed, like copying initialization scripts or configuring the DATABASE.

RUN mkdir /opt/mssql/backup

# Copy your file from the local folder to the container
COPY ./DATABASE/Manager.bak /opt/mssql/backup/

#ENTRYPOINT [ "/bin/bash", "-c", "/opt/mssql/bin/sqlservr" ]
# The default command to run when the container starts (optional)
CMD /bin/bash -c /opt/mssql/bin/sqlservr & /opt/mssql-tools/bin/sqlcmd  \ 
  -S localhost -U sa -P 'Helloworld123' \
  -Q 'RESTORE DATABASE Manager FROM DISK = "/opt/mssql/backup/Manager.bak"' && wait

## /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "Helloworld123" -Q 'SELECT Name from sys.DATABASEs'