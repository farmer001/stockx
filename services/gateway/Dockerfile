FROM node:8

WORKDIR /usr/src/app

COPY package*.json .
COPY lerna.json .

COPY services/gateway/package*.json services/gateway/

RUN yarn
RUN yarn bootstrap

COPY . .

RUN cd services/gateway && yarn
WORKDIR /usr/src/app/services/gateway

CMD ["yarn", "start"]