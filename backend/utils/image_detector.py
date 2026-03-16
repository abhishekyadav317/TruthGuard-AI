import cv2
from deepface import DeepFace

def detect_fake_image(image):

    try:

        result = DeepFace.analyze(
            image,
            actions=["emotion"],
            enforce_detection=False
        )

        # if the model can detect and analyze a face,
        # probability of manipulation assumed lower

        fake_prob = 0.2
        verdict = "Likely Authentic"

    except Exception:

        # if facial analysis fails it may indicate manipulation
        fake_prob = 0.75
        verdict = "Possible Manipulated Image"

    return {
        "fake_probability": float(fake_prob),
        "verdict": verdict
    }