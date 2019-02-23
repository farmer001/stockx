FROM node:8

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "dev"]