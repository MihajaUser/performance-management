import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# --- Charger dataset ---
df = pd.read_csv("data/performance_dataset.csv")

X = df[["kpi_score", "competency_score", "seniority"]]
y = df["final_score"]

# --- Modèle ---
model = RandomForestRegressor(n_estimators=200, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model.fit(X_train, y_train)

# --- Évaluation ---
pred = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, pred))
print("R²:", r2_score(y_test, pred))

# --- Save ---
joblib.dump(model, "model/prediction.joblib")
print("✅ Modèle enregistré : model/prediction.joblib")
