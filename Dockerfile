############################################################
## build the front end
############################################################
FROM node:12.18.2 AS frontendbuilder
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
FROM mcr.microsoft.com/dotnet/sdk:5.0.100-preview.6 AS backendbuilder
WORKDIR /build

COPY ./backend/src/*.csproj /build/
RUN dotnet restore

COPY ./backend/src /build/
RUN dotnet publish --output /dist --configuration Debug

############################################################
## build runtime 
############################################################
FROM mcr.microsoft.com/dotnet/aspnet:5.0.0-preview.6
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
