import React, { useState } from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    // Basic Auth: base64 encode
    const token = btoa(`${username}:${password}`);
    setToken(token);
  };
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="mb-2 w-full p-2 border" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="mb-4 w-full p-2 border" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  );
}