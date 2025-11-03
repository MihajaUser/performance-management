# creates an image named backend-app.
# docker build -t backend-app .

# to launch the container
# docker run -p 3333:3333 backend-app

# to remove a stopped container:
# docker rm <id_of_container>



# Étape 1 : Image Node
FROM node:20-alpine

# Étape 2 : Working directory
WORKDIR /app

# Étape 3 : Copy the necessary files
COPY package*.json ./
RUN npm install

# Étape 4 : Copy the source code
COPY . .

# Étape 5 : Expose the port of Adonis
EXPOSE 3333

# Added a small wait before migration (important for Postgres)
CMD ["sh", "-c", "echo 'Waiting for DB...' && sleep 5 && node ace migration:run && node ace db:seed && node ace serve --watch"]

