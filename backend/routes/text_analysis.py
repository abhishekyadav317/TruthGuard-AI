from fastapi import APIRouter
from pydantic import BaseModel
from utils.text_detector import predict_fake_news

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/analyze-text")
def analyze_text(request: TextRequest):
    result = predict_fake_news(request.text)
    return result