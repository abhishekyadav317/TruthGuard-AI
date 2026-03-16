import React, { useState } from "react";
import axios from "axios";

function VideoAnalyzer(props) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeVideo = async () => {
    if (!file) {
      alert("Upload a video first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-video",
      formData,
    );

    setResult(response.data)
props.setResult(response.data)
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h2>Video Deepfake Detection</h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={analyzeVideo}>Analyze Video</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Fake Probability: {(result.fake_probability * 100).toFixed(2)}%</p>
          <p style={{ fontWeight: "bold" }}>Verdict: {result.verdict}</p>
        </div>
      )}
    </div>
  );
}

export default VideoAnalyzer;
