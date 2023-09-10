import React, { useState, useEffect, useCallback } from "react";
import { useMemory } from "../hooks/useMemory";
import MemoryCard from "../components/MemoryCard";
import Modal from "../components/Modal";

import shuffleArray from "../utils/shuffleArray";

type MemoryCardWithUrl = { url: string; uuid: string; isFlipped: boolean, success: boolean };

type MemoryGameProps = MemoryCardWithUrl[];

const MemoryGame = () => {
  const { data, status } = useMemory(20)

  const [cards, setCards] = useState<MemoryGameProps>();

  const [flippedCards, setFlippedCards] = useState<MemoryGameProps>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [userName, setUserName] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleDataChange = useCallback(() => {
    setCards(() =>
      data && shuffleArray([...data.cardsData, ...data.cardsData])
    );
  }, [status == "success"]);

  useEffect(() => {
    handleDataChange();
  }, [handleDataChange]);


  // refactorizando function
  const handleCardClick = (uuid: string, url: string, isFlipped: boolean) => {
    if (isFlipped) {
      return;
    }

    const updatedCards = cards?.map((card) =>
      card.uuid === uuid
        ? { ...card, isFlipped: true }
        : card
    );

    setCards(updatedCards || []);

    setFlippedCards([...flippedCards, { uuid, url, isFlipped }]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.url === secondCard.url) {
        // Actualiza la propiedad success en true para los elementos que coinciden
        const updatedCards = cards?.map((card) =>
          card.url === firstCard.url || card.url === secondCard.url
            ? { ...card, success: true }
            : card
        );

        setCards(updatedCards || []);

        setMatchedCards([...matchedCards, firstCard.uuid, secondCard.uuid]);

        setSuccesses(successes + 1);
        console.log("matchedCards.length", matchedCards.length)
        console.log("data?.cardsData.length", cards?.length)
        if (matchedCards.length + 2 === cards?.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setErrors(errors + 1);
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);





  const handleRestart = () => {
    if (data) {
      setCards(shuffleArray([...data.cardsData, ...data.cardsData]));
      setFlippedCards([]);
      setMatchedCards([]);
      setErrors(0);
      setSuccesses(0);
      setGameOver(false);
    }
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      {!userName && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => setUserName(userName)}>Start Game</button>
        </div>
      )}
      {userName && (
        <>
          <div className="scoreboard">
            <span>Name: {userName}</span>
            <span>Errors: {errors}</span>
            <span>Successes: {successes}</span>
          </div>
          <div className="memory-board flex flex-wrap justify-center items-center">
            {cards?.map((card) => (
              <MemoryCard
                key={card.uuid}
                uuid={card.uuid}
                success={card.success}
                url={card.url}
                isFlipped={flippedCards.some((c) => c.uuid === card.uuid)}
                onClick={() => handleCardClick(card.uuid, card.url, card.isFlipped)}
              />
            ))}
          </div>
          {gameOver && (
            <Modal onClick={handleRestart} />
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
