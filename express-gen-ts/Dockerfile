# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias, incluyendo los módulos nativos
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Elimina el módulo bcrypt existente para forzar su reinstalación en el contenedor
RUN npm rebuild bcrypt --build-from-source

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
