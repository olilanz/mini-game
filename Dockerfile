FROM nginx:1.12-alpine


ADD  dist /usr/share/nginx/html

EXPOSE 80
