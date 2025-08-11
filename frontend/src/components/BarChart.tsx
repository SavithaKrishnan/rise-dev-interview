import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Legend
} from "recharts";

// Party color mapping
const partyColors = {
  "Democratic": "#1f77b4", // blue
  "Republican": "#d62728", // red
  "Democratic-Republican": "#2ca02c", // green
  "Whig": "#ff7f0e", // orange/yellow
  "Federalist": "#9467bd", // purple
  "No Party": "#7f7f7f" // gray
};

export default function PresidentsBarChart() {
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/visualizations')
      .then(response => response.json())
      .then(data => setAgeData(data))
      .catch(error => console.error(error));
  }, []);

  console.log(ageData)
  // Create legend payload manually
  const legendPayload = Object.keys(partyColors).map((Party) => ({
    value: Party,
    type: "square",
    id: Party,
    color: partyColors[Party]
  }));

  return (
    <div style={{ backgroundColor: "white", padding: "20px" , width: "1200px", height:"500px"}}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>US Presidents Age at Inauguration</h2>
      
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={ageData}
          margin={{ top: 30, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Name_Year"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={150}
          />
          <YAxis domain={[0, 80]} />
          <Tooltip />
          <Legend payload={legendPayload} verticalAlign="top" align="center" />
          <Bar
            dataKey="Age_At_Inauguration"
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={partyColors[payload.Party] || "#8884d8"}
                />
              );
            }}
          >
            <LabelList dataKey="Age_At_Inauguration" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

