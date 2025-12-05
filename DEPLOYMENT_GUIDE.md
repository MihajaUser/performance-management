# 🚀 Guide de Déploiement - Docker Compose

Guide complet pour déployer l'application Performance Management en production avec Docker Compose et HTTPS.

---

## 📋 Prérequis

Avant de commencer, assurez-vous que :

- ✅ Docker et Docker Compose sont installés
- ✅ Les domaines DNS pointent vers votre serveur :
  - `perfmanagement.mild-mg.com` → IP du serveur
  - `back.mild-mg.com` → IP du serveur
  - `ia.mild-mg.com` → IP du serveur
- ✅ Les ports 80 et 443 sont ouverts dans le firewall
- ✅ Vous avez accès SSH au serveur

---

## 🔧 Étape 1 : Vérifier la Configuration

### 1.1 Vérifier backend/.env

Ouvrez `backend/.env` et assurez-vous qu'il contient :

```bash
# Env production
PORT=3333
HOST=0.0.0.0
NODE_ENV=production
APP_KEY=RIK6cORmoPsS8Nk92gNkDfiswEWjb9P6J4+WscTs++Q=
DRIVE_DISK=local

DB_CONNECTION=pg
PG_HOST=db
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=6fmFeJBuX+oNNuUt/AY7CI3xjU5i8HdR
PG_DB_NAME=performance_db

AI_SERVICE_URL=https://ia.mild-mg.com
```

### 1.2 Vérifier nginx/init-letsencrypt.sh

Ouvrez `nginx/init-letsencrypt.sh` et vérifiez l'email :

```bash
email="infos@mild-mg.com"  # ✅ Votre email
```

---

## 🛠️ Étape 2 : Préparer les Scripts

### 2.1 Rendre les scripts exécutables

```bash
chmod +x nginx/init-letsencrypt.sh
chmod +x nginx/renew-certs.sh
chmod +x backend/wait-for-it.sh
```

### 2.2 Vérifier les permissions

```bash
ls -la nginx/*.sh
ls -la backend/wait-for-it.sh
```

Vous devriez voir `-rwxr-xr-x` (exécutable).

---

## 🐳 Étape 3 : Construire et Démarrer les Services

### 3.1 Nettoyer les conteneurs existants (optionnel)

Si vous avez déjà des conteneurs en cours d'exécution :

```bash
# Arrêter et supprimer tous les conteneurs
sudo docker compose down -v

# ⚠️ ATTENTION : -v supprime aussi les volumes (base de données)
# Si vous voulez garder les données, utilisez :
sudo docker compose down
```

### 3.2 Construire les images

```bash
# Construire toutes les images
sudo docker compose build

# Ou construire avec --no-cache pour forcer la reconstruction
sudo docker compose build --no-cache
```

### 3.3 Démarrer les services

```bash
# Démarrer tous les services en arrière-plan
sudo docker compose up -d

# Ou démarrer avec reconstruction automatique
sudo docker compose up --build -d
```

### 3.4 Vérifier que les services démarrent

```bash
# Voir les conteneurs en cours d'exécution
sudo docker compose ps

# Voir les logs en temps réel
sudo docker compose logs -f

# Voir les logs d'un service spécifique
sudo docker compose logs -f backend
sudo docker compose logs -f frontend
sudo docker compose logs -f ai_service
sudo docker compose logs -f nginx
```

---

## 🔒 Étape 4 : Initialiser les Certificats SSL

### 4.1 Vérifier que Nginx est démarré

```bash
sudo docker compose ps nginx
```

Le statut devrait être "Up".

### 4.2 Exécuter le script d'initialisation

```bash
# Exécuter le script d'initialisation Let's Encrypt
./nginx/init-letsencrypt.sh
```

Ce script va :

1. Créer des certificats temporaires auto-signés
2. Démarrer Nginx
3. Obtenir les vrais certificats Let's Encrypt pour chaque domaine
4. Recharger Nginx avec les nouveaux certificats

**Durée estimée** : 2-5 minutes

### 4.3 Vérifier les certificats

```bash
# Vérifier que les certificats ont été créés
sudo ls -la certbot/conf/live/

# Vous devriez voir 3 dossiers :
# - perfmanagement.mild-mg.com/
# - back.mild-mg.com/
# - ia.mild-mg.com/
```

---

## ✅ Étape 5 : Vérification et Tests

### 5.1 Vérifier la configuration Nginx

```bash
# Tester la syntaxe Nginx
sudo docker compose exec nginx nginx -t

# Devrait afficher :
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 5.2 Tester les endpoints HTTP

```bash
# Tester les redirections HTTP → HTTPS
curl -I http://perfmanagement.mild-mg.com
curl -I http://back.mild-mg.com
curl -I http://ia.mild-mg.com

# Devrait retourner : HTTP/1.1 301 Moved Permanently
```

### 5.3 Tester les endpoints HTTPS

```bash
# Tester les connexions HTTPS
curl -I https://perfmanagement.mild-mg.com
curl -I https://back.mild-mg.com
curl -I https://ia.mild-mg.com

# Devrait retourner : HTTP/2 200
```

### 5.4 Tester dans le navigateur

Ouvrez un navigateur et visitez :

- <https://perfmanagement.mild-mg.com> (Frontend)
- <https://back.mild-mg.com> (Backend API)
- <https://ia.mild-mg.com> (AI Service)

Vérifiez le cadenas vert 🔒 dans la barre d'adresse.

### 5.5 Vérifier les logs

```bash
# Logs de tous les services
sudo docker compose logs --tail=100

# Logs du backend (vérifier la connexion DB)
sudo docker compose logs backend | grep -i "database\|postgres\|migration"

# Logs Nginx (vérifier les requêtes)
sudo docker compose logs nginx | tail -20
```

---

## 🔄 Étape 6 : Configuration du Renouvellement Automatique

### 6.1 Tester le renouvellement manuel

```bash
# Tester le script de renouvellement
./nginx/renew-certs.sh
```

### 6.2 Configurer le cron pour le renouvellement automatique

```bash
# Éditer le crontab
crontab -e

# Ajouter cette ligne (renouvellement quotidien à 3h du matin)
0 3 * * * /chemin/absolu/vers/performance-management/nginx/renew-certs.sh >> /var/log/certbot-renew.log 2>&1
```

**Remplacez** `/chemin/absolu/vers/` par le chemin réel, par exemple :

```bash
0 3 * * * /home/user/performance-management/nginx/renew-certs.sh >> /var/log/certbot-renew.log 2>&1
```

### 6.3 Vérifier le cron

```bash
# Lister les tâches cron
crontab -l
```

---

## 📊 Étape 7 : Monitoring et Maintenance

### 7.1 Commandes utiles

```bash
# Voir l'état des conteneurs
sudo docker compose ps

# Voir l'utilisation des ressources
sudo docker stats

# Redémarrer un service spécifique
sudo docker compose restart backend

# Recharger Nginx sans redémarrage
sudo docker compose exec nginx nginx -s reload

# Voir les logs en temps réel
sudo docker compose logs -f --tail=100
```

### 7.2 Sauvegarder la base de données

```bash
# Créer un backup de PostgreSQL
sudo docker compose exec db pg_dump -U postgres performance_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurer un backup
sudo docker compose exec -T db psql -U postgres performance_db < backup_20231205_103000.sql
```

### 7.3 Mettre à jour l'application

```bash
# 1. Récupérer les dernières modifications
git pull

# 2. Reconstruire et redémarrer
sudo docker compose down
sudo docker compose up --build -d

# 3. Vérifier les logs
sudo docker compose logs -f
```

---

## 🆘 Dépannage

### Problème : Les certificats SSL ne s'obtiennent pas

**Solution** :

```bash
# Vérifier que les domaines pointent vers le serveur
nslookup perfmanagement.mild-mg.com
nslookup back.mild-mg.com
nslookup ia.mild-mg.com

# Vérifier que les ports sont ouverts
sudo netstat -tulpn | grep -E ':(80|443)'

# Utiliser le mode staging pour tester
# Éditer nginx/init-letsencrypt.sh et changer :
staging=1
```

### Problème : Le backend ne se connecte pas à la base de données

**Solution** :

```bash
# Vérifier les logs du backend
sudo docker compose logs backend

# Vérifier que PostgreSQL est démarré
sudo docker compose ps db

# Vérifier les variables d'environnement
sudo docker compose exec backend env | grep PG_
```

### Problème : "Port already in use"

**Solution** :

```bash
# Trouver quel processus utilise le port
sudo lsof -i :80
sudo lsof -i :443

# Arrêter le processus ou changer le port dans docker-compose.yml
```

### Problème : Les services ne communiquent pas entre eux

**Solution** :

```bash
# Vérifier le réseau Docker
sudo docker network ls
sudo docker network inspect performance-management_app-network

# Redémarrer tous les services
sudo docker compose down
sudo docker compose up -d
```

---

## 📋 Checklist Finale

Avant de considérer le déploiement comme terminé :

- [ ] ✅ Tous les services démarrent sans erreur
- [ ] ✅ Les certificats SSL sont valides (cadenas vert)
- [ ] ✅ Les trois domaines sont accessibles en HTTPS
- [ ] ✅ Le backend se connecte à la base de données
- [ ] ✅ Le frontend communique avec le backend
- [ ] ✅ Le service AI répond aux requêtes
- [ ] ✅ Les redirections HTTP → HTTPS fonctionnent
- [ ] ✅ Le renouvellement automatique des certificats est configuré
- [ ] ✅ Les backups de la base de données sont planifiés
- [ ] ✅ Les logs sont consultables et sans erreurs critiques

---

## 🎯 Résumé des Commandes Essentielles

```bash
# Démarrage complet
sudo docker compose up --build -d

# Initialisation SSL (première fois seulement)
./nginx/init-letsencrypt.sh

# Voir les logs
sudo docker compose logs -f

# Arrêter tout
sudo docker compose down

# Redémarrer un service
sudo docker compose restart backend

# Recharger Nginx
sudo docker compose exec nginx nginx -s reload
```

---

**🎉 Félicitations !** Votre application est maintenant déployée en production avec HTTPS !

Pour plus d'informations, consultez :

- [NGINX_SETUP.md](file:///c:/Users/DELL/Documents/GitHub/performance-management/NGINX_SETUP.md) - Configuration Nginx détaillée
- [SECURITY_PRODUCTION.md](file:///c:/Users/DELL/Documents/GitHub/performance-management/SECURITY_PRODUCTION.md) - Bonnes pratiques de sécurité
- [PORT_VERIFICATION_REPORT.md](file:///c:/Users/DELL/Documents/GitHub/performance-management/PORT_VERIFICATION_REPORT.md) - Vérification des ports
