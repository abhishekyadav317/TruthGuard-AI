def generate_explanation(result):

    prob = result.get("fake_probability", 0)
    verdict = result.get("verdict", "Unknown")
    suspicious = result.get("suspicious_words", [])
    fact = result.get("fact_check", "")

    reasons = []

    if prob > 0.7:
        reasons.append("The model assigns a high probability that the content is misleading.")
    elif prob > 0.4:
        reasons.append("The model finds mixed credibility signals.")
    else:
        reasons.append("The model detects mostly reliable linguistic patterns.")

    if suspicious:
        reasons.append("The text includes sensational or suspicious terms such as: " + ", ".join(suspicious[:5]) + ".")

    if "No credible" in fact:
        reasons.append("The claim could not be verified in trusted news sources.")
    elif "multiple credible" in fact:
        reasons.append("Similar claims appear in multiple news outlets.")

    explanation = " ".join(reasons)

    return explanation