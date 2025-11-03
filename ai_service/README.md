# 🤖 AI Service – Performance Manager

Ce service gère l’analyse du **sentiment** et la **prédiction de performance** via FastAPI.

---

## ⚙️ Installation

```bash
# Depuis le dossier racine
cd ai_service

# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt


# Depuis le répertoire ai_service
cd ai_service


# Lancer l'entraînement du modèle de sentiment
python3 model/sentiment_model.py


# Depuis le répertoire ai_service lance
uvicorn app:app --reload --port 8001

Exemple de test :
POST http://localhost:8001/analyze-sentiment
{ "text": "Travail médiocre, manque de rigueur" }
