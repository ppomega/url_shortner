import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://urlshortnerback-production.up.railway.app/api/shorten",
        {
          url: inputValue,
        }
      );
      const data = await res.data;

      if (Array.isArray(data)) {
        setResponse(
          `Shortened URL ID: urlshortnerback-production.up.railway.app/${data[0].key}`
        );
      } else {
        setResponse(
          `Shortened URL ID: urlshortnerback-production.up.railway.app/${data.key}`
        );
      }
    } catch (error) {
      setResponse("Error submitting form");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My URL Shortner</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter the URL"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
