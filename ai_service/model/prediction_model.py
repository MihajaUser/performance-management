import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# --- Données d’entraînement simulées ---
# Exemple : [score_auto, score_manager, score_competences] -> score_final
data = pd.DataFrame([
    [70, 75, 3.8, 74],
    [80, 82, 4.2, 81],
    [60, 65, 3.0, 63],
    [85, 88, 4.5, 86],
    [75, 78, 3.9, 77],
    [90, 92, 4.8, 91],
], columns=["auto", "manager", "competencies", "final"])

X = data[["auto", "manager", "competencies"]]
y = data["final"]

# --- Entraînement ---
model = LinearRegression()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# --- Évaluation ---
pred = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, pred))
print("R²:", r2_score(y_test, pred))

# --- Sauvegarde du modèle ---
joblib.dump(model, "model/prediction.joblib")
print("✅ Modèle de prédiction enregistré : model/prediction.joblib")
