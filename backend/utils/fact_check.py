import requests

API_KEY = "9c633339f3254ee78bb0f832b2cf5c13"

def check_claim(text):

    query = text[:100]

    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}"

    try:

        response = requests.get(url)

        data = response.json()

        total = data.get("totalResults",0)

        if total > 5:
            return "Claim appears in multiple credible news sources"

        elif total > 0:
            return "Claim mentioned in limited news sources"

        else:
            return "No credible news sources found"

    except:

        return "Fact-check service unavailable"