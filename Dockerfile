############################################################
## build the front end
############################################################
# https://hub.docker.com/_/node
FROM node:18.18.0 AS frontendbuilder

WORKDIR /build

COPY ./frontend/*.json /build/
RUN npm i -g npm \
    && npm i
RUN npx browserslist@latest --update-db

COPY ./frontend/.parcelrc /build/
COPY ./frontend/src /build/src/
COPY ./frontend/static /build/static/
RUN npm run build

############################################################
## build the back end
############################################################
# https://hub.docker.com/_/microsoft-dotnet-sdk/
FROM mcr.microsoft.com/dotnet/sdk:7.0.401 AS backendbuilder

WORKDIR /build

COPY ./backend/src/*.csproj /build/
RUN dotnet restore

COPY ./backend/src /build/
RUN dotnet publish --output /dist --configuration Debug

############################################################
## build runtime 
############################################################
# https://hub.docker.com/_/microsoft-dotnet-aspnet/
FROM mcr.microsoft.com/dotnet/aspnet:7.0.11

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
