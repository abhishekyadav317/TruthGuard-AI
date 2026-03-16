# backend/utils/text_detector.py
import pickle
import os
import numpy as np
from utils.fact_check import check_claim
from utils.explanation_engine import generate_explanation

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "models", "fake_news_model.pkl")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

vectorizer = model.named_steps["tfidf"]
clf = model.named_steps["clf"]

def explain_text(text, top_k=8):
    X = vectorizer.transform([text])
    feature_names = vectorizer.get_feature_names_out()
    coefs = clf.coef_[0]

    # contribution = tfidf_value * model_weight
    contributions = X.toarray()[0] * coefs
    idx = np.argsort(contributions)[-top_k:]
    words = [feature_names[i] for i in idx if contributions[i] > 0]
    return words[::-1]

def predict_fake_news(text):
    prob = model.predict_proba([text])[0][1]
    verdict = "Likely Fake" if prob > 0.5 else "Likely Real"
    highlights = explain_text(text)
    fact_status = check_claim(text)

    return {
    "fake_probability": float(prob),
    "verdict": verdict,
    "suspicious_words": highlights,
    "fact_check": fact_status
    }
    result["ai_explanation"] = generate_explanation(result)
    return result