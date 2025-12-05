# ⚠️ CORRECTION URGENTE REQUISE - backend/.env

## 🔴 Problème Critique

Le fichier `backend/.env` contient des **ports incorrects** qui empêcheront le démarrage correct de l'application.

---

## 📝 Modifications à Apporter

Ouvrez le fichier `backend/.env` et modifiez les lignes suivantes :

### ❌ Configuration Actuelle (INCORRECTE)

```bash
PORT=3400        # ❌ INCORRECT
PG_PORT=5544     # ❌ INCORRECT
```

### ✅ Configuration Correcte (À APPLIQUER)

```bash
PORT=3333        # ✅ CORRECT
PG_PORT=5432     # ✅ CORRECT
```

---

## 📋 Fichier backend/.env Complet et Correct

Copiez cette configuration complète dans votre fichier `backend/.env` :

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

---

## ✅ Vérification Finale

Après modification, vérifiez que votre fichier `backend/.env` contient :

- ✅ `PORT=3333` (pas 3400)
- ✅ `PG_PORT=5432` (pas 5544)
- ✅ `NODE_ENV=production` (pas development)
- ✅ `APP_KEY=RIK6cORmoPsS8Nk92gNkDfiswEWjb9P6J4+WscTs++Q=`
- ✅ `PG_PASSWORD=6fmFeJBuX+oNNuUt/AY7CI3xjU5i8HdR`
- ✅ `AI_SERVICE_URL=https://ia.mild-mg.com`

---

## 🚀 Après Correction

Une fois le fichier corrigé, redémarrez les services :

```bash
sudo docker compose down
sudo docker compose up --build -d
```

**IMPORTANT** : Sans ces corrections, votre application ne fonctionnera pas correctement !
