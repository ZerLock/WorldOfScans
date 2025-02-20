FROM node:18.16.0-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY api/index.js .

CMD ["node", "index.js"]
