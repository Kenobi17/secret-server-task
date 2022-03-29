FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as image

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g serve

RUN npm ci --only=production

COPY --from=build /usr/src/app/build ./dist

CMD ["serve", "-s", "dist"]



