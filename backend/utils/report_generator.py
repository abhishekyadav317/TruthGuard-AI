from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_report(data, filepath):

    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("TruthGuard AI Analysis Report", styles["Title"]))
    story.append(Spacer(1,20))

    story.append(Paragraph(f"Verdict: {data['verdict']}", styles["Normal"]))
    story.append(Paragraph(f"Fake Probability: {data['fake_probability']}", styles["Normal"]))

    if "fact_check" in data:
        story.append(Paragraph(f"Fact Check: {data['fact_check']}", styles["Normal"]))

    if "suspicious_words" in data:
        words = ", ".join(data["suspicious_words"])
        story.append(Paragraph(f"Suspicious Words: {words}", styles["Normal"]))

    pdf = SimpleDocTemplate(filepath)
    pdf.build(story)