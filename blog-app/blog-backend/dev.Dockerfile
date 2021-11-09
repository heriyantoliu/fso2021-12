FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV CHOKIDAR_USEPOLLING="true"

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install

CMD ["npm", "run", "dev"]