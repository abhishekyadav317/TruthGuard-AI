import React, { useState } from "react";
import TextAnalyzer from "./components/TextAnalyzer";
import ImageAnalyzer from "./components/ImageAnalyzer";
import VideoAnalyzer from "./components/VideoAnalyzer";
import BackgroundGrid from "./components/BackgroundGrid";
import Particles from "./components/Particles";
import "./styles.css";

function App(){

  const [activeTab,setActiveTab] = useState("text");

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

      <div className="dashboard">

        <div className="card">
          <TextAnalyzer/>
        </div>

        <div className="card">
          <ImageAnalyzer/>
        </div>

        <div className="card">
          <VideoAnalyzer/>
        </div>

      </div>

      <div className="mobile-panel">

        {activeTab==="text" && <TextAnalyzer/>}
        {activeTab==="image" && <ImageAnalyzer/>}
        {activeTab==="video" && <VideoAnalyzer/>}

      </div>

    </div>
  );
}

export default App;