# creates an image called frontend-app
# docker build -t frontend-app .

# to launch the container
# docker run -p 3000:3000 frontend-app


# to remove a stopped container:
# docker rm <id_of_container>


# Étape 1 : Build the application
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Lightweight server for production
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]
