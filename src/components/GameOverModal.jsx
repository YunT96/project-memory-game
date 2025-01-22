import React from "react";
import "../styles/GameOverModal.css";

const GameOverModal = ({ onRestart }) => {
  return (
    <div className="game-over-modal">
      <div className="modal-content">
        <h2>Game Over!</h2>
        <p>You clicked a card twice.</p>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default GameOverModal;
