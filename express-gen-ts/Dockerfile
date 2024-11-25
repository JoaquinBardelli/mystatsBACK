# Usa la imagen base de Node.js
FROM node:20-alpine as build

# Define el directorio de trabajo para la etapa de construcción
WORKDIR /app

# Copia los archivos del package.json y package-lock.json desde express-gen-ts/
COPY mystatsBACK/express-gen-ts/package.json ./express-gen-ts/
COPY mystatsBACK/express-gen-ts/package-lock.json ./express-gen-ts/

# Copia los archivos del package.json y package-lock.json desde la raíz del proyecto
COPY mystatsBACK/package.json ./
COPY mystatsBACK/package-lock.json ./

# Instala las dependencias del proyecto
RUN npm ci

# Copia todo el código fuente de express-gen-ts
COPY mystatsBACK/express-gen-ts ./express-gen-ts/

# Si tienes otro código fuente en la raíz, también debes copiarlo
COPY mystatsBACK ./  # Copia el resto del proyecto (si necesario)

# Ejecuta el build (si es necesario)
WORKDIR /app/express-gen-ts
RUN npm run build

# Para la etapa de producción, usa una imagen más ligera
FROM node:20-alpine as production

WORKDIR /app

# Copia los archivos necesarios para producción
COPY mystatsBACK/package.json ./
RUN npm install --only=production

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/express-gen-ts/dist ./express-gen-ts/dist

# Configura las variables de entorno y puertos
ENV NODE_ENV=production
ENV PORT=3000

# Expone el puerto y ejecuta el servicio
EXPOSE 3000
CMD ["node", "express-gen-ts/dist/index.js"]
