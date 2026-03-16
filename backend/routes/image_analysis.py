from fastapi import APIRouter, UploadFile, File
import cv2
import numpy as np
from utils.image_detector import detect_fake_image

router = APIRouter()

@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    result = detect_fake_image(img)

    return result