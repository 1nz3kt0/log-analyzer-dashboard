import React, { useEffect, useState } from "react";
import Chart from "./Chart";

export default function Dashboard({ token }) {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/logs", {
      headers: { Authorization: `Basic ${token}` },
    })
      .then(res => res.json())
      .then(setLogs);
  }, [token]);
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Log Analytics</h2>
      <Chart data={logs} />
      {/* Puedes agregar más visualizaciones aquí */}
    </div>
  );
}