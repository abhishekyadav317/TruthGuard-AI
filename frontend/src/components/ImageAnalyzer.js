import React, { useState } from "react";
import axios from "axios";

function ImageAnalyzer(props) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeImage = async () => {
    if (!file) {
      alert("Upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-image",
      formData,
    );

    setResult(response.data);
    props.setResult(response.data);
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h2>Image Deepfake Detection</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {file && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}

      <br />
      <br />

      <button onClick={analyzeImage}>Analyze Image</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Fake Probability: {(result.fake_probability * 100).toFixed(2)}%</p>
          <p style={{ fontWeight: "bold" }}>Verdict: {result.verdict}</p>
        </div>
      )}
    </div>
  );
}

export default ImageAnalyzer;
