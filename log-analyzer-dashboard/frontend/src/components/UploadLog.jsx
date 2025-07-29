import React, { useState } from "react";

export default function UploadLog({ token }) {
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    setMsg(data.msg);
  };
  return (
    <div className="mb-4">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button className="ml-2 bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpload}>Upload Log</button>
      <div className="mt-2">{msg}</div>
    </div>
  );
}