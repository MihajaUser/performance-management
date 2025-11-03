from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os

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


# === 📘 Schémas ===
class SentimentRequest(BaseModel):
    text: str


class PredictionRequest(BaseModel):
    auto: float
    manager: float
    competencies: float


# === ROUTES ===

@app.get("/")
def root():
    return {"message": "AI Service is running 🚀"}


# 🔹 Analyse de sentiment
@app.post("/analyze-sentiment")
def analyze_sentiment(req: SentimentRequest):
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
