############################################################
## build environment
############################################################
FROM node:latest AS builder

COPY ./*.json /build/
COPY ./src /build/src/

WORKDIR /build
RUN npm i -g npm \
    && npm i \
    && npm run build

############################################################
## runtime
############################################################
FROM nginx:1.12-alpine
COPY --from=builder /build/dist /usr/share/nginx/html/

EXPOSE 80
