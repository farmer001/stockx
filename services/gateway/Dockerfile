FROM node:8

WORKDIR /usr/src/app

COPY services/gateway/package*.json services/gateway/

RUN yarn

COPY . .

WORKDIR /usr/src/app/services/gateway

CMD ["yarn", "start"]