#!/bin/bash

# ========================================
# 🔄 Script de renouvellement des certificats
# ========================================

set -e

echo "### Renouvellement des certificats Let's Encrypt ###"

# Renouveler les certificats
docker compose run --rm --entrypoint "\
  certbot renew --webroot -w /var/www/certbot" nginx

# Recharger Nginx
docker compose exec nginx nginx -s reload

echo "### Renouvellement terminé! ###"
