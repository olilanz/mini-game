############################################################
## build the front end
############################################################
FROM node:10.10.0 AS frontendbuilder

COPY ./frontend/*.json /build/
COPY ./frontend/src /build/src/

WORKDIR /build
RUN npm i -g npm \
    && npm i \
    && npm run build

############################################################
## build the front end
############################################################
FROM microsoft/dotnet:2.2-sdk AS backendbuilder

COPY ./backend /build/

WORKDIR /build
RUN dotnet publish --output /dist

############################################################
## build runtime 
############################################################
FROM microsoft/dotnet:2.2-aspnetcore-runtime
COPY --from=backendbuilder /dist /app
COPY --from=frontendbuilder /build/dist /app/wwwroot

############################################################
## configure startup 
############################################################
ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000/tcp
WORKDIR /app
ENTRYPOINT ["dotnet", "src.dll", "--server.urls", "http://*:5000"]
