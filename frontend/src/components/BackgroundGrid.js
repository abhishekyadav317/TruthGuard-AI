import React from "react";

function BackgroundGrid(){

  return(
    <div style={{
      position:"fixed",
      top:0,
      left:0,
      width:"100%",
      height:"100%",
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize:"40px 40px",
      zIndex:-1,
      animation:"gridMove 20s linear infinite"
    }}/>
  );
}

export default BackgroundGrid;