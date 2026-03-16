from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.text_analysis import router as text_router
from routes.image_analysis import router as image_router
from routes.video_analysis import router as video_router
from utils.report_generator import generate_report
from fastapi.responses import FileResponse

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text_router)
app.include_router(image_router)
app.include_router(video_router)


@app.get("/")
def home():
    return {"message": "TruthGuard AI Backend Running"}
@app.post("/generate-report")
def generate_report_api(data: dict):

    filepath = "analysis_report.pdf"

    generate_report(data, filepath)

    return FileResponse(filepath, media_type="application/pdf", filename="TruthGuard_Report.pdf")