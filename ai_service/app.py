# ai_service/app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
import os

from utils.course_search import search_courses


# === NEW (Hugging Face)
from transformers import pipeline

app = FastAPI(title="AI Service – Performance Manager")

# === 🔐 CORS Middleware ===
default_origins = [
    "http://localhost:3000",        # développement local
    "http://127.0.0.1:3000",
    "http://frontend:3000",         # nom du conteneur Docker du frontend
    "http://frontend:3400",         # si tu changes le port interne
    "http://backend:3333",          # pour permettre aux appels du backend
]

# lire la variable d'environnement
env_origins = os.getenv("AI_CORS_ORIGINS")

# si vide → autoriser toutes les origines (mode développement)
if env_origins in (None, "", "*"):
    allowed_origins = ["*"]
else:
    allowed_origins = [o.strip() for o in env_origins.split(",")]
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# === 🧠 Chargement des modèles ===
try:
    sentiment_model = joblib.load("model/sentiment.joblib")
except Exception:
    sentiment_model = None

try:
    prediction_model = joblib.load("model/performance.joblib")
except Exception:
    prediction_model = None

# === NEW (Hugging Face) : Charger le modèle multilingue PyTorch ===
# === NEW (Hugging Face Fine-tuned support) ===
from pathlib import Path

try:
    local_model_path = Path("model/finetuned-sentiment")
    if local_model_path.exists():
        print("✅ Chargement du modèle fine-tuned local...")
        hf_analyzer = pipeline("sentiment-analysis", model=str(local_model_path))
    else:
        print(
            "⚠️ Modèle fine-tuned introuvable, utilisation du modèle de base Hugging Face."
        )
        hf_analyzer = pipeline(
            "sentiment-analysis",
            model="nlptown/bert-base-multilingual-uncased-sentiment",
        )
except Exception as e:
    hf_analyzer = None
    print(f"⚠️ Erreur de chargement du modèle Hugging Face : {e}")


# === 📘 Schémas ===
class SentimentRequest(BaseModel):
    text: str


class PredictionRequest(BaseModel):
    kpi_score: float
    competency_score: float
    seniority: float


class CourseRequest(BaseModel):
    kpi: str
    job: str


# === ROUTES ===


@app.get("/")
def root():
    return {"message": "AI Service is running 🚀"}


# 🔹 Analyse de sentiment
@app.post("/analyze-sentiment")
def analyze_sentiment(req: SentimentRequest):
    # === NEW (Hugging Face)
    # Utilise le modèle Hugging Face si disponible, sinon le modèle joblib
    if hf_analyzer is not None:
        try:
            result = hf_analyzer(req.text)[0]
            label = result["label"]

            # === Vérifier si c’est un modèle fine-tuné local (labels personnalisés)
            custom_labels = ["aggressif", "neutral", "positive"]

            if label.lower() in custom_labels:
                sentiment = label.lower()  # on renvoie directement le label du modèle
            else:
                # === Sinon, on garde la logique Hugging Face (5 stars)
                mapping = {
                    "1 star": "negative",
                    "2 stars": "negative",
                    "3 stars": "neutral",
                    "4 stars": "positive",
                    "5 stars": "positive",
                }
                sentiment = mapping.get(label.lower(), "unknown")
                if label.lower() == "1 star":
                    sentiment = "aggressif"

            return {
                "text": req.text,
                "sentiment": sentiment,
                "raw_label": label,
                "confidence": round(result["score"], 3),
            }

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Hugging Face error: {str(e)}")

    # === Ancienne version (fallback vers joblib)
    if sentiment_model is None:
        raise HTTPException(status_code=500, detail="Sentiment model not loaded.")
    try:
        prediction = sentiment_model.predict([req.text])[0]
        return {"text": req.text, "sentiment": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 Prédiction de performance
@app.post("/predict")
def predict_performance(req: PredictionRequest):
    if prediction_model is None:
        raise HTTPException(status_code=500, detail="Prediction model not loaded.")
    try:
        features = [[
            req.kpi_score,
            req.competency_score,
            req.seniority
        ]]
        prediction = prediction_model.predict(features)[0]
        return {
            "inputs": req.dict(),
            "predicted_score": round(float(prediction), 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/recommend-course")
def recommend_course(req: CourseRequest):
    """Recherche automatique de formations en ligne."""
    try:
        data = search_courses(req.kpi, req.job)
        return {"query": data["query"], "results": data["results"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
