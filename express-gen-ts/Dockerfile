# Etapa de Build
FROM node:20-alpine as build

WORKDIR /my-app

# Copiar configuraciones y dependencias
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Etapa de Producción
FROM node:20-alpine as production

WORKDIR /my-app

# Copiar tsconfig.json para que tsconfig-paths pueda resolver rutas
COPY --from=build /my-app/tsconfig.json ./tsconfig.json

# Copiar los archivos necesarios para producción
COPY --from=build /my-app/dist ./dist
COPY --from=build /my-app/node_modules ./node_modules
COPY --from=build /my-app/package.json ./package.json
COPY --from=build /my-app/env ./env

# Configuración de entorno
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Ejecutar usando tsconfig-paths
CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]

EXPOSE 3000
