import React from "react";
import "./GameResults.css";

const GameResults = ({ winners }) => {
  return (
    <div className="game-results-container">
      <div className="game-results">
        <h3>GameOver</h3>
        <div className="winner-container">
          {winners.map((winner, i) => (
            <div className="winner" key={i}>
              <span>{winner[0]}</span>
              <span>{winner[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameResults;
