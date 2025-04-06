import React, { useState } from "react";

const SpamFilter = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const checkSpam = () => {
    const spamWords = ["free", "money", "win", "click"];
    const isSpam = spamWords.some(word => text.toLowerCase().includes(word));
    setResult(isSpam ? "🚫 SPAM Detected" : "✅ Looks Safe");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI SPAM Filter</h2>
      <textarea
        placeholder="Enter comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={checkSpam}>Check</button>
      <p>{result}</p>
    </div>
  );
};

export default SpamFilter;
