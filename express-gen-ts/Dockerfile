# Usa la imagen base de Node.js
FROM node:20-alpine as build

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json desde la carpeta express-gen-ts/
COPY express-gen-ts/package.json ./
COPY express-gen-ts/package-lock.json ./

# Instala las dependencias usando npm
RUN npm ci

# Copia el resto de los archivos de express-gen-ts
COPY express-gen-ts . .

# Ejecuta el build de la aplicación (si tienes este comando en tu package.json)
RUN npm run build

# Para la etapa de producción, usa una imagen más ligera
FROM node:20-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copia solo los archivos necesarios para producción
COPY express-gen-ts/package.json ./
RUN npm install --only=production

# Copia los archivos construidos desde la etapa de build
COPY --from=build /app/dist ./dist

# Variables de entorno para la producción
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV JET_LOGGER_MODE=CONSOLE
ENV JET_LOGGER_FILEPATH=jet-logger.log
ENV JET_LOGGER_TIMESTAMP=TRUE
ENV JET_LOGGER_FORMAT=LINE

# Inicia la aplicación
CMD ["node", "dist/index.js"]

# Expone el puerto 3000
EXPOSE 3000
