// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "../styles/GameOverModal.css";

const GameOverModal = ({ onRestart, isWin }) => {
  return (
    <div className="game-over-modal">
      <div className="modal-content">
        <h2>{isWin ? "Congratulations! 🎉" : "Game Over!"}</h2>
        <p>
          {isWin
            ? "You matched all cards!"
            : "You clicked the same card twice!"}
        </p>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
};

GameOverModal.propTypes = {
  onRestart: PropTypes.func.isRequired,
  isWin: PropTypes.bool.isRequired,
};

export default GameOverModal;
