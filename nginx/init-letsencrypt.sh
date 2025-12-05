#!/bin/bash

# ========================================
# 🔒 Script d'initialisation Let's Encrypt
# ========================================

set -e

domains=(
  "perfmanagement.mild-mg.com"
  "back.mild-mg.com"
  "ia.mild-mg.com"
)

email="infos@mild-mg.com" # Remplacer par votre email
staging=0 # Mettre à 1 pour tester avec l'environnement de staging

echo "### Initialisation des certificats Let's Encrypt ###"

# Créer les répertoires nécessaires
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Télécharger les paramètres SSL recommandés
if [ ! -f "./certbot/conf/options-ssl-nginx.conf" ]; then
  echo "### Téléchargement des paramètres SSL recommandés..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "./certbot/conf/options-ssl-nginx.conf"
fi

if [ ! -f "./certbot/conf/ssl-dhparams.pem" ]; then
  echo "### Téléchargement des paramètres DH..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "./certbot/conf/ssl-dhparams.pem"
fi

# Créer des certificats auto-signés temporaires pour chaque domaine
for domain in "${domains[@]}"; do
  echo "### Création de certificat temporaire pour $domain..."
  
  path="/etc/letsencrypt/live/$domain"
  mkdir -p "./certbot/conf/live/$domain"
  
  if [ ! -f "./certbot/conf/live/$domain/fullchain.pem" ]; then
    docker compose run --rm --entrypoint "\
      openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
        -keyout '$path/privkey.pem' \
        -out '$path/fullchain.pem' \
        -subj '/CN=localhost'" nginx
  fi
done

echo "### Démarrage de Nginx..."
docker compose up -d nginx

# Obtenir les vrais certificats pour chaque domaine
for domain in "${domains[@]}"; do
  echo "### Obtention du certificat pour $domain..."
  
  # Supprimer le certificat temporaire
  docker compose run --rm --entrypoint "\
    rm -rf /etc/letsencrypt/live/$domain && \
    rm -rf /etc/letsencrypt/archive/$domain && \
    rm -rf /etc/letsencrypt/renewal/$domain.conf" nginx

  # Obtenir le vrai certificat
  if [ $staging != "0" ]; then staging_arg="--staging"; fi
  
  docker compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg \
      --email $email \
      --agree-tos \
      --no-eff-email \
      -d $domain" nginx
done

echo "### Rechargement de Nginx..."
docker compose exec nginx nginx -s reload

echo "### Certificats SSL installés avec succès! ###"
