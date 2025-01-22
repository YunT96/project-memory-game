import React, { useState, useEffect, useRef } from "react"; // Add useRef import
import Card from "./Card";
import GameOverModal from "./GameOverModal";
import "../styles/GameBoard.css";

const GameBoard = ({ difficulty, onRestart }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const effectRan = useRef(false); // Add this ref

  useEffect(() => {
    // If in development and effect has already run, skip
    if (effectRan.current === true) {
      return;
    }

    const fetchCards = async () => {
      const cardCount =
        difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
      const fetchedCards = [];
      const fetchedIds = new Set();

      while (fetchedCards.length < cardCount) {
        let randomId = Math.floor(Math.random() * 1025) + 1;

        if (!fetchedIds.has(randomId)) {
          fetchedIds.add(randomId);

          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomId}`
          );
          const data = await response.json();

          fetchedCards.push({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
          });
        }
      }

      setCards(shuffle(fetchedCards));
      setLoading(false);
    };

    if (!gameOver) {
      fetchCards();
    }

    // Set effectRan to true after first run
    return () => {
      effectRan.current = true;
    };
  }, [difficulty, gameOver]);

  // Rest of your component code remains the same
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card) => {
    if (selectedCards.includes(card.id)) {
      setGameOver(true);
    } else {
      setSelectedCards((prev) => [...prev, card.id]);
      shuffle(cards);
    }
  };

  const handleRestart = () => {
    setGameOver(false);
    setSelectedCards([]);
    onRestart(); // Call the parent's restart handler
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {gameOver ? (
        <GameOverModal onRestart={handleRestart} />
      ) : (
        // <p>Game Over! You clicked a card twice.</p>
        <div className="card-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
