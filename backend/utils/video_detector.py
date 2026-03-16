import cv2
import numpy as np
from utils.image_detector import detect_fake_image

def detect_fake_video(video_path):

    cap = cv2.VideoCapture(video_path)

    frame_scores = []
    frame_count = 0

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        # analyze every 20th frame for efficiency
        if frame_count % 20 == 0:

            result = detect_fake_image(frame)

            frame_scores.append(result["fake_probability"])

    cap.release()

    if len(frame_scores) == 0:
        return {
            "fake_probability": 0.0,
            "verdict": "No frames analyzed"
        }

    avg_score = float(np.mean(frame_scores))

    if avg_score > 0.5:
        verdict = "Possible Deepfake Video"
    else:
        verdict = "Likely Authentic Video"

    return {
        "fake_probability": avg_score,
        "verdict": verdict
    }