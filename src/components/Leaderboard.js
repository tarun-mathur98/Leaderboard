import React from "react";

const Leaderboard = ({ players }) => {
  return (
    <table border="1" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
          <th>Player ID</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td>{player.playerId}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
