from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
import pandas as pd
from sklearn.model_selection import train_test_split

# === 1️⃣ Charger ton CSV local ===
df = pd.read_csv("data/sentiment_dataset.csv")

# === 2️⃣ Diviser en train/test ===
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)
train_df.to_csv("data/train.csv", index=False)
test_df.to_csv("data/test.csv", index=False)

dataset = load_dataset("csv", data_files={"train": "data/train.csv", "test": "data/test.csv"})

# === 3️⃣ Encoder les labels ===
labels = sorted(df["label"].unique().tolist())
label2id = {label: i for i, label in enumerate(labels)}
id2label = {i: label for label, i in label2id.items()}
print("Label mapping:", label2id)

# === 4️⃣ Tokenizer + modèle de base ===
model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=len(labels),
    id2label=id2label,
    label2id=label2id,
    ignore_mismatched_sizes=True
)

# === NEW: transformer la colonne 'label' en 'labels' numériques
def label_to_id(example):
    return {"labels": label2id[example["label"]]}
dataset = dataset.map(label_to_id)

# Supprimer la colonne texte 'label' (on garde 'labels' numérique)
dataset = dataset.remove_columns(["label"])

# === 5️⃣ Préparer les tokens ===
def preprocess_function(examples):
    return tokenizer(examples["text"], truncation=True, padding=True)

tokenized_datasets = dataset.map(preprocess_function, batched=True)

# === 6️⃣ Arguments d'entraînement ===
training_args = TrainingArguments(
    output_dir="model/finetuned-sentiment",
    eval_strategy="epoch",            # <= was evaluation_strategy
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=2,
    weight_decay=0.01,
    logging_steps=10,
    report_to="none",                 # évite les warnings de loggers
    seed=42,
)


# === 7️⃣ Trainer ===
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
    tokenizer=tokenizer,
)

# === 8️⃣ Lancer l'entraînement ===
trainer.train()

# === 9️⃣ Sauvegarder le modèle fine-tuné ===
trainer.save_model("model/finetuned-sentiment")
tokenizer.save_pretrained("model/finetuned-sentiment")

print("✅ Fine-tuning terminé et modèle sauvegardé dans model/finetuned-sentiment/")
