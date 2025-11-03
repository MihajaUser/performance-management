import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# === Données d'entraînement minimalistes ===
texts = [
    "Excellent travail, très professionnel",
    "Bonne performance, satisfait du résultat",
    "Travail moyen, peut mieux faire",
    "Mauvaise communication, résultat décevant",
    "Très bon esprit d'équipe, efficace",
    "Travail médiocre, manque de rigueur",
]
labels = ["positive", "positive", "neutral", "negative", "positive", "negative"]

# === Création du pipeline : vectorisation + modèle ===
model = make_pipeline(CountVectorizer(), MultinomialNB())

# === Entraînement ===
model.fit(texts, labels)

# === Sauvegarde du modèle ===
joblib.dump(model, "model/sentiment.joblib")

print("✅ Modèle de sentiment entraîné et sauvegardé avec succès !")
