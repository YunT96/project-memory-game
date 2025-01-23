// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "../styles/Scoreboard.css";

const Scoreboard = ({ currentScore, highScore, totalCards }) => {
  return (
    <div className="scoreboard">
      <div className="score-container">
        <span className="score-label">Progress:</span>
        <span className="current-score">
          {currentScore}/{totalCards}
        </span>
      </div>
      <div className="score-container">
        <span className="score-label">High Score:</span>
        <span className="high-score">{highScore}</span>
      </div>
    </div>
  );
};

Scoreboard.propTypes = {
  currentScore: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  totalCards: PropTypes.number.isRequired,
};

export default Scoreboard;
