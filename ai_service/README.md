# 🤖 AI Service – Performance Manager

Ce service gère l'analyse du **sentiment** et la **prédiction de performance** via FastAPI.

---

## ⚙️ Installation

```bash
# Depuis le dossier racine
cd ai_service

# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

---

## 🏋️ Entraînement du modèle

```bash
# Depuis le répertoire ai_service
cd ai_service

# Lancer l'entraînement du modèle de sentiment
python3 model/sentiment_model.py

# Lancer l'entraînement du modèle de prediction
python3 model/prediction_model.py
```

---

## 🚀 Lancement du serveur

```bash
# Depuis le répertoire ai_service
uvicorn app:app --reload --port 8001
```

---

## 🧪 Test de l'API

### 1. Analyse de sentiment

```bash
POST http://localhost:8001/analyze-sentiment
Content-Type: application/json

{
  "text": "Travail médiocre, manque de rigueur"
}
```

**Réponse attendue :**

```json
{
  "sentiment": "negative",
  "score": 0.85
}
```

### 2. Prédiction de performance

```bash
POST http://localhost:8001/predict
Content-Type: application/json

{
  "auto": 75,
  "manager": 80,
  "competencies": 4.2
}
```

**Réponse attendue :**

```json
{
  "inputs": {
    "auto": 75,
    "manager": 80,
    "competencies": 4.2
  },
  "predicted_score": 78.6
}
```
