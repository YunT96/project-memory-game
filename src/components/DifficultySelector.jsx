import React from "react";
import "../styles/DifficultySelector.css";

const DifficultySelector = ({ onSelectDifficulty }) => {
  return (
    <div className="difficulty-selector">
      <h2>Select Difficulty</h2>
      <button onClick={() => onSelectDifficulty("easy")}>Normal</button>
      <button onClick={() => onSelectDifficulty("medium")}>Hard</button>
      <button onClick={() => onSelectDifficulty("hard")}>Impossible</button>
    </div>
  );
};

export default DifficultySelector;
