import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

function TrustGauge({ score }) {
  const data = [{ name: "Trust", value: score }];

  return (
    <RadialBarChart
      width={250}
      height={250}
      cx="50%"
      cy="50%"
      innerRadius="70%"
      outerRadius="100%"
      data={data}
      startAngle={180}
      endAngle={0}
    >
      <RadialBar
        minAngle={15}
        background
        clockWise
        dataKey="value"
      />
    </RadialBarChart>
  );
}

export default TrustGauge;