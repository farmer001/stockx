FROM node:8

WORKDIR /usr/src/app

COPY package*.json .
COPY lerna.json .

COPY services/true-size/package*.json services/true-size

RUN yarn
RUN yarn bootstrap

COPY . .

RUN cd services/true-size && yarn && npx tsc -b
WORKDIR /usr/src/app/services/true-size

CMD ["yarn", "start"]