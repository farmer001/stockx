FROM node:8

WORKDIR /usr/src/app

COPY package*.json .
COPY lerna.json .

COPY packages/web/package*.json packages/web

RUN yarn
RUN yarn bootstrap

COPY . .

RUN cd packages/web && yarn build
WORKDIR /usr/src/app/packages/web

CMD ["yarn", "start:dev"]