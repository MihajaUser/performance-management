# 🔒 Guide de Sécurité - Configuration Production

## Configuration du fichier .env

Voici la configuration recommandée pour votre fichier `backend/.env` en production :

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
PG_PASSWORD=VotreMotDePasseSecurise123!
PG_DB_NAME=performance_db

AI_SERVICE_URL=https://ia.mild-mg.com
```

## 🔑 Clés de Sécurité Générées

### APP_KEY (Nouvelle clé sécurisée)

```
RIK6cORmoPsS8Nk92gNkDfiswEWjb9P6J4+WscTs++Q=
```

Cette clé a été générée de manière cryptographiquement sécurisée (32 bytes aléatoires en base64).

## ⚠️ Actions Requises

### 1. Mot de passe PostgreSQL

**IMPORTANT** : Changez le mot de passe PostgreSQL par défaut !

Générez un mot de passe fort :

```bash
# Générer un mot de passe aléatoire sécurisé
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"
```

Puis mettez à jour dans :

- `backend/.env` → `PG_PASSWORD=VotreNouveauMotDePasse`
- `docker-compose.yml` → Service `db` → `POSTGRES_PASSWORD`

### 2. Variables d'environnement dans docker-compose.yml

Mettez à jour le service `backend` dans `docker-compose.yml` :

```yaml
backend:
  build: ./backend
  expose:
    - "3333"
  depends_on:
    - db
    - ai_service
  environment:
    - NODE_ENV=production
    - DB_CONNECTION=pg
    - PG_HOST=db
    - PG_PORT=5432
    - PG_USER=postgres
    - PG_PASSWORD=${PG_PASSWORD}  # Utiliser variable d'environnement
    - PG_DB_NAME=performance_db
    - AI_SERVICE_URL=https://ia.mild-mg.com
    - APP_KEY=${APP_KEY}  # Utiliser variable d'environnement
  env_file:
    - ./backend/.env
  networks:
    - app-network
```

### 3. Créer un fichier .env à la racine (optionnel)

Pour centraliser les secrets :

```bash
# .env (à la racine du projet)
PG_PASSWORD=VotreMotDePasseSecurise123!
APP_KEY=RIK6cORmoPsS8Nk92gNkDfiswEWjb9P6J4+WscTs++Q=
```

Puis référencez-le dans `docker-compose.yml` :

```yaml
env_file:
  - .env
```

## 🛡️ Checklist de Sécurité Production

- [ ] **APP_KEY** : Nouvelle clé générée ✅
- [ ] **PG_PASSWORD** : Mot de passe fort configuré
- [ ] **NODE_ENV** : Défini sur `production`
- [ ] **Ports** : Services internes non exposés (seulement Nginx sur 80/443) ✅
- [ ] **HTTPS** : Certificats SSL configurés ✅
- [ ] **Firewall** : Ports 80 et 443 ouverts, autres ports fermés
- [ ] **Backups** : Stratégie de sauvegarde PostgreSQL en place
- [ ] **Logs** : Rotation des logs configurée
- [ ] **.env** : Fichier .env dans .gitignore ✅

## 🔐 Bonnes Pratiques Supplémentaires

### 1. Utiliser des secrets Docker (recommandé)

Pour une sécurité maximale, utilisez Docker secrets :

```bash
# Créer les secrets
echo "VotreMotDePasse" | docker secret create postgres_password -
echo "RIK6cORmoPsS8Nk92gNkDfiswEWjb9P6J4+WscTs++Q=" | docker secret create app_key -
```

### 2. Limiter les connexions PostgreSQL

Dans `docker-compose.yml`, ajoutez :

```yaml
db:
  environment:
    POSTGRES_HOST_AUTH_METHOD: md5  # Requiert mot de passe
```

### 3. Activer les logs de sécurité

```yaml
backend:
  logging:
    driver: "json-file"
    options:
      max-size: "10m"
      max-file: "3"
```

### 4. Configurer CORS correctement

Dans votre backend AdonisJS, configurez CORS pour n'accepter que votre domaine :

```typescript
// config/cors.ts
{
  origin: ['https://perfmanagement.mild-mg.com'],
  credentials: true
}
```

## 🚀 Commandes de Déploiement

```bash
# 1. Mettre à jour .env avec les nouvelles valeurs
# 2. Reconstruire et redémarrer les services
sudo docker compose down
sudo docker compose up --build -d

# 3. Vérifier les logs
sudo docker compose logs -f backend

# 4. Tester la connexion
curl https://back.mild-mg.com/health
```

## 📊 Monitoring

Considérez l'ajout de :

- **Monitoring** : Prometheus + Grafana
- **Logs centralisés** : ELK Stack ou Loki
- **Alertes** : Alertmanager
- **Backups automatiques** : pg_dump via cron

## 🆘 En cas de compromission

Si vous suspectez une compromission :

1. **Régénérer immédiatement APP_KEY** :

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **Changer le mot de passe PostgreSQL**

3. **Révoquer et régénérer les certificats SSL**

4. **Auditer les logs** pour détecter les accès non autorisés

---

**Note** : Gardez ce guide en sécurité et ne commitez JAMAIS les fichiers `.env` dans Git !
