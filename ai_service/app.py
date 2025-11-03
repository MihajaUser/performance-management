from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI(title="AI Sentiment Service")

# Charger le modèle sauvegardé
model = joblib.load("model/sentiment.joblib")

class SentimentRequest(BaseModel):
    text: str

@app.post("/analyze-sentiment")
def analyze_sentiment(req: SentimentRequest):
    prediction = model.predict([req.text])[0]
    return {"text": req.text, "sentiment": prediction}
