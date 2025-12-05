# 🔧 Guide de Dépannage - Erreurs Docker Build

## Problème : Erreur 500 du Registre npm

### Symptôme

```
npm error 500 Internal Server Error - GET https://registry.npmjs.org/...
```

### Cause

Problème temporaire avec le registre npm (npmjs.org).

---

## ✅ Solutions

### Solution 1 : Réessayer avec Retry Automatique (Recommandé)

J'ai déjà modifié le `frontend/Dockerfile` pour ajouter des retries automatiques.

```powershell
# Nettoyer le cache Docker
docker compose down
docker builder prune -f

# Reconstruire
docker compose build --no-cache frontend
docker compose up -d
```

### Solution 2 : Attendre et Réessayer

Si le problème persiste, attendez 5-10 minutes (le registre npm peut avoir des problèmes temporaires).

```powershell
# Réessayer après quelques minutes
docker compose build frontend
docker compose up -d
```

### Solution 3 : Utiliser le Cache npm

Si vous avez déjà construit l'image une fois :

```powershell
# Construire sans --no-cache
docker compose build frontend
docker compose up -d
```

### Solution 4 : Build en Dehors de Docker (Développement Local)

Si vous êtes en développement local :

```powershell
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances localement
npm install

# Retourner à la racine
cd ..

# Reconstruire Docker
docker compose build frontend
docker compose up -d
```

---

## 🔍 Autres Erreurs Courantes

### Erreur : "ECONNRESET" ou "ETIMEDOUT"

**Solution** : Problème de connexion réseau

```powershell
# Vérifier votre connexion Internet
ping registry.npmjs.org

# Réessayer avec un timeout plus long
docker compose build --build-arg NPM_CONFIG_FETCH_TIMEOUT=300000 frontend
```

### Erreur : "Disk space"

**Solution** : Nettoyer Docker

```powershell
# Nettoyer les images inutilisées
docker system prune -a

# Voir l'espace disque
docker system df
```

### Erreur : "Cannot find module"

**Solution** : Problème de package.json

```powershell
# Vérifier package.json
cd frontend
npm install
cd ..

# Reconstruire
docker compose build --no-cache frontend
```

---

## 📋 Checklist de Dépannage

Avant de demander de l'aide, vérifiez :

- [ ] Docker Desktop est démarré et fonctionne
- [ ] Connexion Internet stable
- [ ] Espace disque suffisant (`docker system df`)
- [ ] Fichier `package.json` valide
- [ ] Pas de proxy/firewall bloquant npm
- [ ] Réessayé après quelques minutes

---

## 🚀 Commandes Utiles

```powershell
# Voir les logs de build détaillés
docker compose build --progress=plain frontend

# Nettoyer tout le cache Docker
docker builder prune -a -f

# Reconstruire tout de zéro
docker compose down
docker compose build --no-cache
docker compose up -d

# Voir l'utilisation disque
docker system df

# Nettoyer les images inutilisées
docker image prune -a
```

---

## 📞 Si le Problème Persiste

1. **Vérifier le statut de npm** : <https://status.npmjs.org/>
2. **Essayer un autre réseau** (4G, autre WiFi)
3. **Désactiver temporairement le VPN/Proxy**
4. **Utiliser un miroir npm** (ex: Taobao pour la Chine)

---

## 🔄 Modifications Apportées

✅ **frontend/Dockerfile** : Ajout de retry automatique (5 tentatives)
✅ **frontend/.npmrc** : Configuration npm robuste
