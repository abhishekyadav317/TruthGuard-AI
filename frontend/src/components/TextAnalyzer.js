import React, { useState } from "react";
import axios from "axios";

function TextAnalyzer(props) {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) {
      alert("Please enter article text");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze-text", {
        text: text,
      });

      setResult(response.data);

      if (props.setResult) {
        props.setResult(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to AI service");
    }

    setLoading(false);
  };

  const downloadReport = async () => {
    if (!result) return;

    const response = await axios.post(
      "http://127.0.0.1:8000/generate-report",
      result,
      { responseType: "blob" },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "TruthGuard_Report.pdf");

    document.body.appendChild(link);
    link.click();
  };

  const trustScore = result ? (1 - result.fake_probability) * 100 : 0;

  let riskLevel = "";
  let color = "";

  if (trustScore <= 40) {
    riskLevel = "High Misinformation Risk";
    color = "red";
  } else if (trustScore <= 70) {
    riskLevel = "Uncertain Credibility";
    color = "orange";
  } else {
    riskLevel = "Likely Reliable";
    color = "green";
  }

  return (
    <div>
      <h2>Text Misinformation Detection</h2>

      <textarea
        rows="7"
        placeholder="Paste article text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <button onClick={analyzeText}>Analyze Article</button>

      {loading && <p style={{ marginTop: "15px" }}>AI analyzing content...</p>}

      {result && (
        <div style={{ marginTop: "25px" }}>
          <h3>Trust Score: {trustScore.toFixed(2)} / 100</h3>

          <p>Fake Probability: {(result.fake_probability * 100).toFixed(2)}%</p>

          <p
            style={{
              color: color,
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Risk Level: {riskLevel}
          </p>

          <p>Verdict: {result.verdict}</p>

          {result.ai_explanation && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <b>AI Explanation</b>
              <p>{result.ai_explanation}</p>
            </div>
          )}

          {result.fact_check && <p>Fact Check: {result.fact_check}</p>}

          {result.suspicious_words && result.suspicious_words.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <b>Suspicious language:</b>

              <div>
                {result.suspicious_words.map((word, i) => (
                  <span
                    key={i}
                    style={{
                      margin: "5px",
                      padding: "5px 10px",
                      background: "#ef4444",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          <br />

          <button onClick={downloadReport}>Download AI Report</button>
        </div>
      )}
    </div>
  );
}

export default TextAnalyzer;
