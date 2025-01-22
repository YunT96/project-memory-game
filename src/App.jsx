import { useState } from "react";
import "./App.css";
import DifficultySelector from "./components/DifficultySelector";

const App = () => {
  const [difficulty, setDifficulty] = useState(null);

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    console.log("Difficulty selected:", selectedDifficulty);
    // Transition to the game logic or another component
  };

  return (
    <div>
      {!difficulty ? (
        <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
      ) : (
        <p>Game starts with {difficulty} difficulty!</p>
        // Render the Game component here
      )}
    </div>
  );
};

export default App;
