import joblib
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# === NEW ===
# Charger automatiquement le dataset CSV
dataset_path = "data/sentiment_dataset.csv"
data = pd.read_csv(dataset_path)

texts = data["text"].tolist()
labels = data["label"].tolist()

# === Création du pipeline : vectorisation + modèle ===
model = make_pipeline(CountVectorizer(), MultinomialNB())

# === Entraînement ===
model.fit(texts, labels)

# === (Optionnel) évaluer rapidement sur le même set ===
preds = model.predict(texts)
print("=== Rapport d'entraînement ===")
print(classification_report(labels, preds))

# === Sauvegarde du modèle ===
joblib.dump(model, "model/sentiment.joblib")

print("✅ Modèle de sentiment entraîné depuis data/sentiment_dataset.csv et sauvegardé avec succès !")

# === OLD COMMENT ===
# Quand tu élargiras ton dataset, ce script servira de base
# avant de passer à un fine-tuning Hugging Face plus avancé.
