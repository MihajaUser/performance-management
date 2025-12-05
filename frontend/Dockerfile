# creates an image called frontend-app
# docker build -t frontend-app .

# to launch the container
# docker run -p 3000:3000 frontend-app


# to remove a stopped container:
# docker rm <id_of_container>


# ---- Étape 1 : Build l'application ----
FROM node:20-slim AS builder

WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Configurer npm pour plus de robustesse
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install

# Copier tout le code
COPY . .

# Construire le projet Next.js
RUN npm run build

# ---- Étape 2 : Image allégée pour la prod ----
FROM node:20-slim

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]

