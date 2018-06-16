FROM nginx:1.12-alpine

ADD  assets /usr/share/nginx/html/assets
ADD  build /usr/share/nginx/html/build
ADD  index.html /usr/share/nginx/html

EXPOSE 80
