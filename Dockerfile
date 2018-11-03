############################################################
## build the front end
############################################################
FROM node:10.12.0 AS frontendbuilder
WORKDIR /build

COPY ./frontend/*.json /build/
RUN npm i -g npm \
    && npm i

COPY ./frontend/src /build/src/
RUN npm run build

############################################################
## build the front end
############################################################
FROM microsoft/dotnet:2.1-sdk AS backendbuilder
WORKDIR /build

COPY ./backend/src/*.csproj /build/
RUN dotnet restore

COPY ./backend/src /build/
RUN dotnet publish --output /dist --configuration Debug

############################################################
## build runtime 
############################################################
FROM microsoft/dotnet:2.1-aspnetcore-runtime
COPY --from=backendbuilder /dist /app
COPY --from=frontendbuilder /build/dist /app/wwwroot/gamecore

############################################################
## configure startup 
############################################################
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT "Development"
ENV ASPNETCORE_URLS http://*:80

EXPOSE 80/tcp

ENTRYPOINT ["dotnet", "src.dll" ]
