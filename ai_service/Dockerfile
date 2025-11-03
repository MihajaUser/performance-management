# ========================================
# 🤖 AI Service - Dockerfile
# ========================================

# Étape 1 : Image de base légère
FROM python:3.11-slim

# Éviter la génération de fichiers pyc + activer logs immédiats
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Définir le répertoire de travail
WORKDIR /app

# Étape 2 : Copier uniquement les dépendances pour le cache
COPY requirements.txt .

# Étape 3 : Installer les dépendances
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Étape 4 : Copier le reste du code du projet
COPY . .

# Étape 5 : Exposer le port utilisé par FastAPI
EXPOSE 8001

# Étape 6 : Démarrer l'application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
