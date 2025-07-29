import React, { useState } from "react";
import Login from "./components/Login";
import UploadLog from "./components/UploadLog";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(null);
  if (!token) return <Login setToken={setToken} />;
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <UploadLog token={token} />
      <Dashboard token={token} />
    </div>
  );
}

export default App;