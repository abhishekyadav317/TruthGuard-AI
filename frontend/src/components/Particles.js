import React from "react";

function Particles(){

  const particles = new Array(40).fill(0);

  return (
    <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-2}}>
      {particles.map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          width:"4px",
          height:"4px",
          background:"#06b6d4",
          borderRadius:"50%",
          top:Math.random()*100+"%",
          left:Math.random()*100+"%",
          opacity:0.6,
          boxShadow:"0 0 10px #06b6d4"
        }}/>
      ))}
    </div>
  );
}

export default Particles;