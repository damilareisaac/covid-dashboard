# pull the base image
FROM node:lts-alpine as build-step

WORKDIR /app

ENV PATH /app/node_modules/.bin$PATH

COPY package.json ./

COPY ./src ./src
COPY ./public ./public

RUN yarn install

RUN yarn build


FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
