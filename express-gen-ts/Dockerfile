FROM node:20-alpine as build

WORKDIR /my-app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /my-app

COPY package.json ./
RUN npm install --only=production

COPY --from=build /my-app/dist ./dist
COPY --from=build /my-app/env ./env

ENV PORT=3000
ENV HOST=0.0.0.0
ARG NODE_ENV=production
ENV NODE_ENV=production
ENV JET_LOGGER_MODE=CONSOLE
ENV JET_LOGGER_FILEPATH=jet-logger.log
ENV JET_LOGGER_TIMESTAMP=TRUE
ENV JET_LOGGER_FORMAT=LINE

CMD ["node", "dist/index.js"]

EXPOSE 3000
