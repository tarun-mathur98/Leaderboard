import React, { useState } from "react";

const ScoreForm = ({ socket }) => {
  const [playerId, setPlayerId] = useState("");
  const [score, setScore] = useState("");
  const [region, setRegion] = useState("india");
  const [mode, setMode] = useState("international");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerId || !score) return;

    socket.emit("updateScore", {
      playerId,
      score: parseInt(score),
      region,
      mode,
    });

    setScore("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Player ID"
      />
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Score"
      />
      <button type="submit">Update Score</button>
    </form>
  );
};

export default ScoreForm;
