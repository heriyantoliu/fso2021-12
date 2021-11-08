FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY . .

RUN npm ci --only-production

CMD npm start