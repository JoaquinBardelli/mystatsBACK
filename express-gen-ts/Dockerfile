# Etapa de Build
FROM node:20-alpine as build

WORKDIR /my-app

# Copiar configuraciones y dependencias
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# Copiar el archivo de entorno, si existe, al contenedor
COPY ./env/development.env ./env/development.env

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Etapa de Producción
FROM node:20-alpine as production

WORKDIR /my-app

# Copiar archivos necesarios para producción
COPY --from=build /my-app/tsconfig.json ./tsconfig.json
COPY --from=build /my-app/dist ./dist
COPY --from=build /my-app/node_modules ./node_modules
COPY --from=build /my-app/package.json ./package.json
COPY --from=build /my-app/env/development.env ./env/development.env

# Configuración de entorno
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Reducir dependencias a solo producción
RUN npm prune --production

# Ejecutar usando tsconfig-paths
CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]

EXPOSE 3000
