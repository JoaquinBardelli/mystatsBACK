# Etapa de construcción
FROM node:20-alpine as build

# Define el directorio de trabajo para la construcción dentro de express-gen-ts
WORKDIR /app

# Copia los archivos package.json y package-lock.json desde express-gen-ts
COPY express-gen-ts/package.json ./express-gen-ts/
COPY express-gen-ts/package-lock.json ./express-gen-ts/

# Instala las dependencias del proyecto
RUN npm ci

# Copia todo el código fuente de express-gen-ts
COPY express-gen-ts ./express-gen-ts/

# Ejecuta el build
WORKDIR /app/express-gen-ts
RUN npm run build

# Etapa de producción
FROM node:20-alpine as production

# Define el directorio de trabajo para producción
WORKDIR /app

# Copia el package.json de express-gen-ts
COPY express-gen-ts/package.json ./express-gen-ts/
RUN npm install --only=production

# Copia los archivos construidos desde la etapa de build
COPY --from=build /app/express-gen-ts/dist ./express-gen-ts/dist

# Configura las variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["node", "express-gen-ts/dist/index.js"]
