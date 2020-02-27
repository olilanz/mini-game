############################################################
## build the front end
############################################################
FROM node:12.16.1 AS frontendbuilder
WORKDIR /build

COPY ./frontend/*.json /build/
RUN npm i -g npm \
    && npm i

COPY ./frontend/src /build/src/
COPY ./frontend/static /build/static/
RUN npm run build

############################################################
## build the back end
############################################################
FROM mcr.microsoft.com/dotnet/core/sdk:3.1.102 AS backendbuilder
WORKDIR /build

COPY ./backend/src/*.csproj /build/
RUN dotnet restore

COPY ./backend/src /build/
RUN dotnet publish --output /dist --configuration Debug

############################################################
## build runtime 
############################################################
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.2
COPY --from=backendbuilder /dist /app
COPY --from=frontendbuilder /build/dist /app/wwwroot/gamecore

############################################################
## configure startup 
############################################################
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT "Development"
ENV ASPNETCORE_URLS http://*:80

EXPOSE 80/tcp

ENTRYPOINT ["dotnet", "src.dll"]
