FROM node:14 as build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only-production

ENV REACT_APP_BACKEND_URL="http://localhost:8080"

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html