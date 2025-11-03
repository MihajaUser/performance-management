# creates an image named backend-app.
# docker build -t backend-app .

# to launch the container
# docker run -p 3333:3333 backend-app

# to remove a stopped container:
# docker rm <id_of_container>



# Étape 1 : Image Node
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

# Ajoute netcat pour tester la connexion
RUN apk add --no-cache netcat-openbsd

# Commande de lancement avec attente réelle du Postgres
CMD ["sh", "-c", "./wait-for-it.sh db 5432 -- node ace migration:run && node ace db:seed && node ace serve --watch"]
