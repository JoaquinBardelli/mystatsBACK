# Etapa de Build
FROM node:20-alpine as build

WORKDIR /my-app

# Instalar dependencias
COPY package.json package-lock.json ./ 
RUN npm ci

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Etapa de Producción
FROM node:20-alpine as production

WORKDIR /my-app

# Copiar archivos desde la etapa de build
COPY --from=build /my-app/dist ./dist
COPY --from=build /my-app/node_modules ./node_modules
COPY --from=build /my-app/package.json ./package.json
COPY --from=build /my-app/env ./env

# Configuración de Entorno
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV JET_LOGGER_MODE=CONSOLE
ENV JET_LOGGER_FILEPATH=jet-logger.log
ENV JET_LOGGER_TIMESTAMP=TRUE
ENV JET_LOGGER_FORMAT=LINE

# Usar tsconfig-paths y ejecutar la app
CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]

EXPOSE 3000
