FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL="http://192.168.96.1:3000"
ENV CHOKIDAR_USEPOLLING="true"

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]