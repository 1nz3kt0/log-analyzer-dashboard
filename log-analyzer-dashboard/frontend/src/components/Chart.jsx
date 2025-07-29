import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Chart({ data }) {
  // Agrupa por día y severidad
  const byDay = {};
  data.forEach(log => {
    const day = log.date?.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + (log.severity === "ERROR" ? 1 : 0);
  });
  return (
    <Bar
      data={{
        labels: Object.keys(byDay),
        datasets: [{ label: "Errores por día", data: Object.values(byDay), backgroundColor: "rgba(255,99,132,0.6)" }],
      }}
    />
  );
}