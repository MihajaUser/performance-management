# 🔒 Configuration Nginx Reverse Proxy avec HTTPS

Ce guide explique comment déployer et configurer le reverse proxy Nginx avec support HTTPS/SSL pour les trois services de l'application Performance Management.

## 📋 Prérequis

1. **DNS configuré** : Les trois domaines doivent pointer vers votre serveur :
   - `perfmanagement.mild-mg.com` → Frontend
   - `back.mild-mg.com` → Backend API
   - `ia.mild-mg.com` → AI Service

2. **Ports ouverts** : Les ports 80 et 443 doivent être accessibles depuis Internet

3. **Docker et Docker Compose** installés sur le serveur

## 🚀 Déploiement Initial

### 1. Configuration de l'email pour Let's Encrypt

Éditez le fichier `nginx/init-letsencrypt.sh` et remplacez l'email :

```bash
email="admin@mild-mg.com"  # Remplacer par votre email
```

### 2. Rendre les scripts exécutables

```bash
chmod +x nginx/init-letsencrypt.sh
chmod +x nginx/renew-certs.sh
```

### 3. Lancer les services

```bash
# Build et démarrage de tous les services
sudo docker compose up --build -d
```

### 4. Initialiser les certificats SSL

```bash
# Exécuter le script d'initialisation
./nginx/init-letsencrypt.sh
```

Ce script va :

- Créer des certificats temporaires auto-signés
- Démarrer Nginx
- Obtenir les vrais certificats Let's Encrypt pour chaque domaine
- Recharger Nginx avec les nouveaux certificats

## 🔄 Renouvellement des Certificats

Les certificats Let's Encrypt sont valides 90 jours. Pour automatiser le renouvellement :

### Configuration d'une tâche cron

```bash
# Éditer le crontab
crontab -e

# Ajouter cette ligne pour renouveler tous les jours à 3h du matin
0 3 * * * /chemin/vers/performance-management/nginx/renew-certs.sh >> /var/log/certbot-renew.log 2>&1
```

### Renouvellement manuel

```bash
./nginx/renew-certs.sh
```

## 🧪 Vérification

### Tester la configuration Nginx

```bash
# Vérifier la syntaxe
sudo docker compose exec nginx nginx -t

# Voir les logs
sudo docker compose logs nginx
```

### Tester les endpoints HTTPS

```bash
# Frontend
curl -I https://perfmanagement.mild-mg.com

# Backend
curl -I https://back.mild-mg.com

# AI Service
curl -I https://ia.mild-mg.com
```

### Vérifier les certificats SSL

Visitez chaque URL dans un navigateur et vérifiez le cadenas vert (certificat valide).

## 📁 Structure des Fichiers

```
nginx/
├── nginx.dockerfile          # Dockerfile pour Nginx + Certbot
├── nginx.conf                # Configuration principale Nginx
├── conf.d/                   # Configurations des sites
│   ├── frontend.conf         # Config pour perfmanagement.mild-mg.com
│   ├── backend.conf          # Config pour back.mild-mg.com
│   └── ai_service.conf       # Config pour ia.mild-mg.com
├── init-letsencrypt.sh       # Script d'initialisation SSL
└── renew-certs.sh            # Script de renouvellement

certbot/                      # Créé automatiquement
├── conf/                     # Certificats SSL
└── www/                      # Challenge ACME
```

## 🔧 Commandes Utiles

### Recharger la configuration Nginx

```bash
sudo docker compose exec nginx nginx -s reload
```

### Redémarrer Nginx

```bash
sudo docker compose restart nginx
```

### Voir les logs en temps réel

```bash
sudo docker compose logs -f nginx
```

### Arrêter tous les services

```bash
sudo docker compose down
```

### Supprimer tout (y compris les volumes)

```bash
sudo docker compose down -v
```

## ⚠️ Mode Test (Staging)

Pour tester la configuration sans atteindre les limites de Let's Encrypt, utilisez le mode staging :

Dans `nginx/init-letsencrypt.sh`, changez :

```bash
staging=1  # Mode test
```

Les certificats obtenus ne seront pas valides mais vous pourrez tester le processus.

## 🔒 Sécurité

- Les certificats SSL sont stockés dans `./certbot/conf`
- Les configurations utilisent TLS 1.2 et 1.3
- Headers de sécurité activés (X-Frame-Options, X-Content-Type-Options, etc.)
- Redirection automatique HTTP → HTTPS

## 🐛 Dépannage

### Erreur "too many certificates already issued"

Vous avez atteint la limite de Let's Encrypt (5 certificats par semaine). Attendez ou utilisez le mode staging.

### Erreur "Connection refused"

Vérifiez que les services backend sont bien démarrés :

```bash
sudo docker compose ps
```

### Certificats non valides

Vérifiez que les domaines DNS pointent bien vers votre serveur :

```bash
nslookup perfmanagement.mild-mg.com
nslookup back.mild-mg.com
nslookup ia.mild-mg.com
```

## 📞 Support

Pour plus d'informations sur Let's Encrypt : <https://letsencrypt.org/docs/>
