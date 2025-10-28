# Cela crée une image nommée backend-app.
# docker build -t backend-app .

# Lancer le conteneur
# docker run -p 3333:3333 backend-app

# pour supprimer un conteneur arrêté :
# docker rm <id_du_conteneur>



# Étape 1 : Image Node
FROM node:20-alpine

# Étape 2 : Répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Étape 4 : Copier le code source
COPY . .

# Étape 5 : Exposer le port d’Adonis
EXPOSE 3333

# Étape 6 : Lancer le serveur
CMD ["node", "ace", "serve", "--watch"]
