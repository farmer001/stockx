FROM node:8

WORKDIR /usr/src/app

COPY package*.json .
COPY lerna.json .

COPY services/true-size/package*.json services/true-size

RUN yarn
RUN yarn bootstrap

COPY . .

RUN yarn && npx tsc -b services/true-size
WORKDIR /usr/src/app/services/true-size

CMD ["yarn", "start:dev"]