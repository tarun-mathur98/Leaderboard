import "./App.css";
import React, { useEffect,useState, useCallback } from "react";
import { io } from "socket.io-client";
import ScoreForm from "./components/ScoreForm";
import Leaderboard from "./components/Leaderboard";
import axios from "axios";

const socket = io("http://localhost:5000"); // backend port

const REGION_OPTIONS = [
  { value: "india", label: "India" },
  { value: "us", label: "US" },
  { value: "china", label: "China" },
  { value: "england", label: "England" },
];

const MODE_OPTIONS = [
  { value: "international", label: "International" },
  { value: "ranji", label: "Ranji" },
];

function App() {
  const [players, setPlayers] = useState([]);
  const [region, setRegion] = useState("india");
  const [mode, setMode] = useState("international");

  const fetchLeaderboard = useCallback(async (region, mode) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/leaderboard/${region}/${mode}/top/10`
      );
      setPlayers(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard(region, mode);

    const handleScoreUpdated = () => fetchLeaderboard(region, mode);
    socket.on("scoreUpdated", handleScoreUpdated);

    return () => {
      socket.off("scoreUpdated", handleScoreUpdated);
    };
  }, [region, mode, fetchLeaderboard]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Leaderboard</h2>

      <div>
        <label>Region: </label>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {REGION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "10px" }}>Mode: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          {MODE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <ScoreForm socket={socket} region={region} mode={mode} />
      <Leaderboard players={players} />
    </div>
  );
}

export default App;
