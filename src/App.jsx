import { useState } from "react";
import "./App.css";
import DifficultySelector from "./components/DifficultySelector";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [difficulty, setDifficulty] = useState(null);

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    console.log("Difficulty selected:", selectedDifficulty);
  };

  const handleRestart = () => {
    setDifficulty(null); // Reset difficulty to null to show the difficulty selector
  };

  return (
    <div>
      <div>
        {!difficulty ? (
          <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
        ) : (
          <div className="game-container">
            <GameBoard difficulty={difficulty} onRestart={handleRestart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
