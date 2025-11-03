# 🤖 AI Service – Performance Manager

Ce service gère l'analyse du **sentiment** et la **prédiction de performance** via FastAPI.

---

## ⚙️ Installation

```bash
# Depuis le dossier racine du projet
cd ai_service

# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances Python
pip install -r requirements.txt
```

---

## 🏋️ Entraînement des modèles

### 1️⃣ Modèle de sentiment

```bash
python3 model/sentiment_model.py
```

➡️ **Produit** : `model/sentiment.joblib`

### 2️⃣ Modèle de prédiction

```bash
python3 model/prediction_model.py
```

➡️ **Produit** : `model/prediction.joblib`

---

## 🚀 Lancer le serveur FastAPI

```bash
uvicorn app:app --reload --port 8001
```

L'API sera disponible sur :
👉 **http://localhost:8001**

---

## 🧪 Tests d'API

### 🔹 1. Analyse de sentiment

```http
POST http://localhost:8001/analyze-sentiment
Content-Type: application/json

{
  "text": "Travail médiocre, manque de rigueur"
}
```

**Réponse attendue :**

```json
{
  "text": "Travail médiocre, manque de rigueur",
  "sentiment": "negative"
}
```

---

### 🔹 2. Prédiction de performance

```http
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

---
