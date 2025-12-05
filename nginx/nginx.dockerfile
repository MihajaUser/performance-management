# ========================================
# 🔒 Nginx Reverse Proxy with SSL - Dockerfile
# ========================================

FROM nginx:alpine

# Installer Certbot pour Let's Encrypt
RUN apk add --no-cache certbot certbot-nginx openssl

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/

# Créer les répertoires nécessaires
RUN mkdir -p /var/www/certbot /etc/letsencrypt /var/log/nginx

# Exposer les ports HTTP et HTTPS
EXPOSE 80 443

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
