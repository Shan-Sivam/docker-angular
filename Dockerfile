# stage 1

FROM node:alpine As builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build-prod

# stage 2

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/angular-app /usr/share/nginx/html

