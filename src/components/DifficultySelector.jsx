import React from "react";
import "../styles/DifficultySelector.css";

const DifficultySelector = ({ onSelectDifficulty }) => {
  return (
    <div className="difficulty-selector">
      <h2>Select Difficulty</h2>
      <button onClick={() => onSelectDifficulty("easy")}>Easy</button>
      <button onClick={() => onSelectDifficulty("medium")}>Medium</button>
      <button onClick={() => onSelectDifficulty("hard")}>Hard</button>
    </div>
  );
};

export default DifficultySelector;
