# Cela crée une image appelée frontend-app
# docker build -t frontend-app .

# Lancer le conteneur
# docker run -p 3000:3000 frontend-app


# pour supprimer un conteneur arrêté :
# docker rm <id_du_conteneur>


# Étape 1 : Build de l’application
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur léger pour la production
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]
