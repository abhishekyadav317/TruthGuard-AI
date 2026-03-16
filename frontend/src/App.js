import React, { useState } from "react";
import TextAnalyzer from "./components/TextAnalyzer";
import ImageAnalyzer from "./components/ImageAnalyzer";
import VideoAnalyzer from "./components/VideoAnalyzer";

import BackgroundGrid from "./components/BackgroundGrid";
import Particles from "./components/Particles";
import "./styles.css";

function App(){

  const [textResult,setTextResult] = useState(null);
  const [imageResult,setImageResult] = useState(null);
  const [videoResult,setVideoResult] = useState(null);

  const [activeTab,setActiveTab] = useState("text");

  const textFake = textResult ? textResult.fake_probability : 0;
  const imageFake = imageResult ? imageResult.fake_probability : 0;
  const videoFake = videoResult ? videoResult.fake_probability : 0;

  const truthScore = (
    (1-textFake)*0.4 +
    (1-imageFake)*0.3 +
    (1-videoFake)*0.3
  ) * 100;

  return(

    <div style={{padding:"40px"}}>

      <BackgroundGrid/>
      <Particles/>

      <div className="title">
        TruthGuard AI
      </div>

      <div className="subtitle">
        Multi-Modal AI Misinformation Detection System
      </div>

      

      {/* Mobile Tabs */}

      <div className="mobile-tabs">

        <button
          className={`mobile-tab-btn ${activeTab==="text"?"active":""}`}
          onClick={()=>setActiveTab("text")}
        >
          Text
        </button>

        <button
          className={`mobile-tab-btn ${activeTab==="image"?"active":""}`}
          onClick={()=>setActiveTab("image")}
        >
          Image
        </button>

        <button
          className={`mobile-tab-btn ${activeTab==="video"?"active":""}`}
          onClick={()=>setActiveTab("video")}
        >
          Video
        </button>

      </div>

      {/* Desktop Dashboard */}

      <div className="dashboard">

        <div className="card">
          <TextAnalyzer setResult={setTextResult}/>
        </div>

        <div className="card">
          <ImageAnalyzer setResult={setImageResult}/>
        </div>

        <div className="card">
          <VideoAnalyzer setResult={setVideoResult}/>
        </div>

      </div>

      {/* Mobile Panels */}

      <div className="mobile-panel">

        {activeTab==="text" &&
          <TextAnalyzer setResult={setTextResult}/>
        }

        {activeTab==="image" &&
          <ImageAnalyzer setResult={setImageResult}/>
        }

        {activeTab==="video" &&
          <VideoAnalyzer setResult={setVideoResult}/>
        }

      </div>

    </div>
  );
}

export default App;