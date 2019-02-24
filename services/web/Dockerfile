FROM node:8

WORKDIR /usr/src/app

COPY package*.json .
COPY lerna.json .

COPY services/web/package*.json services/web

RUN yarn
RUN yarn bootstrap

COPY . .

RUN cd services/web && yarn && npx tsc -b
WORKDIR /usr/src/app/services/web

CMD ["yarn", "start:dev"]