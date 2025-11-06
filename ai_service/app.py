from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
from utils.course_search import search_courses 

# === NEW (Hugging Face)
from transformers import pipeline

app = FastAPI(title="AI Service – Performance Manager")

# === 🧠 Chargement des modèles ===
try:
    sentiment_model = joblib.load("model/sentiment.joblib")
except Exception:
    sentiment_model = None

try:
    prediction_model = joblib.load("model/prediction.joblib")
except Exception:
    prediction_model = None

# === NEW (Hugging Face) : Charger le modèle multilingue PyTorch ===
try:
    hf_analyzer = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
except Exception as e:
    hf_analyzer = None
    print(f"⚠️ Erreur de chargement du modèle Hugging Face : {e}")

# === 📘 Schémas ===
class SentimentRequest(BaseModel):
    text: str


class PredictionRequest(BaseModel):
    auto: float
    manager: float
    competencies: float

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

            # === NEW : Conversion du label en sentiment simplifié
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
        features = [[req.auto, req.manager, req.competencies]]
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
