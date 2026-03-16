from fastapi import APIRouter, UploadFile, File
import numpy as np
import cv2
import tempfile
from utils.video_detector import detect_fake_video

router = APIRouter()

@router.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):

    contents = await file.read()

    # save video temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_video:
        temp_video.write(contents)
        video_path = temp_video.name

    result = detect_fake_video(video_path)

    return result