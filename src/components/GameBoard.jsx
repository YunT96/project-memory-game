// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Scoreboard from "./Scoreboard";
import Card from "./Card";
import GameOverModal from "./GameOverModal";
import "../styles/GameBoard.css";

const GameBoard = ({ difficulty, onRestart }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameOver, setGameOver] = useState({ isOpen: false, isWin: false });
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("memoryGameHighScore");
    return saved ? parseInt(saved) : 0;
  });
  const effectRan = useRef(false);

  const getTotalCards = () =>
    difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;

  useEffect(() => {
    if (effectRan.current) return;

    const fetchCards = async () => {
      const cardCount = getTotalCards();
      const fetchedCards = [];
      const fetchedIds = new Set();

      while (fetchedCards.length < cardCount) {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        if (fetchedIds.has(randomId)) continue;

        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomId}`
          );
          const data = await response.json();
          fetchedCards.push({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
          });
          fetchedIds.add(randomId);
        } catch (error) {
          console.error("Error fetching Pokemon:", error);
        }
      }

      setCards(shuffle(fetchedCards));
      setLoading(false);
    };

    if (!gameOver.isOpen) fetchCards();
    return () => {
      effectRan.current = true;
    };
  }, [difficulty, gameOver.isOpen]);

  useEffect(() => {
    if (gameOver.isOpen && currentScore > highScore) {
      localStorage.setItem("memoryGameHighScore", currentScore);
      setHighScore(currentScore);
    }
  }, [gameOver.isOpen, currentScore, highScore]);

  const shuffle = (array) => {
    const shuffledArray = [...array];
    // Add shuffle class to all cards
    const cardElements = document.querySelectorAll(".card");
    cardElements.forEach((card) => card.classList.add("shuffle"));

    // Perform the shuffle
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    // Remove shuffle class after animation completes
    setTimeout(() => {
      cardElements.forEach((card) => card.classList.remove("shuffle"));
    }, 300); // Match the animation duration

    setCards(shuffledArray);
    return shuffledArray;
  };

  const handleCardClick = (card) => {
    if (selectedCards.includes(card.id)) {
      setGameOver({ isOpen: true, isWin: false });
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setSelectedCards((prev) => [...prev, card.id]);
      setCards(shuffle(cards));

      if (newScore === getTotalCards()) {
        setGameOver({ isOpen: true, isWin: true });
      }
    }
  };

  const handleRestart = () => {
    setGameOver({ isOpen: false, isWin: false });
    setSelectedCards([]);
    setCurrentScore(0);
    onRestart();
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="game-board-container">
      <Scoreboard
        currentScore={currentScore}
        highScore={highScore}
        totalCards={getTotalCards()}
      />
      {gameOver.isOpen ? (
        <GameOverModal onRestart={handleRestart} isWin={gameOver.isWin} />
      ) : (
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

GameBoard.propTypes = {
  difficulty: PropTypes.oneOf(["easy", "medium", "hard"]).isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default GameBoard;
