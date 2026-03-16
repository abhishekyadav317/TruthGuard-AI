import pandas as pd
import pickle
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

# Load datasets
fake = pd.read_csv("../../datasets/Fake.csv")
true = pd.read_csv("../../datasets/True.csv")

fake["label"] = 1
true["label"] = 0

data = pd.concat([fake, true])

data = data[["text", "label"]]

# simple cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'[^a-zA-Z ]', '', text)
    return text

data["text"] = data["text"].apply(clean_text)

X = data["text"]
y = data["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english", max_df=0.7)),
    ("clf", LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)

pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, pred))

# save model
with open("../../models/fake_news_model.pkl", "wb") as f:
    pickle.dump(model, f)