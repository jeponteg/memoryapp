import React, { useState, useEffect, useCallback } from "react";
import { useMemory } from "../hooks/useMemory";
import MemoryCard from "../components/MemoryCard";
import Modal from "../components/Modal";
import shuffleArray from "../utils/shuffleArray";
import TrackingTable from "../components/TrackingTable";
import Skeleton from "../components/Skeleton";

type MemoryCardWithUrl = { url: string; uuid: string; isFlipped: boolean, success: boolean };

type MemoryGameProps = MemoryCardWithUrl[];

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryGameProps>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<MemoryGameProps>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [userName, setUserName] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { data, status } = useMemory(20)

  const handleStartGameClick = () => {
    setIsGameStarted(true);
    localStorage.setItem("username", userName);
  };

  const handleRestart = () => {
    if (data) {
      const shuffledData: MemoryGameProps = shuffleArray([
        ...data.cardsData,
        ...data.cardsData
      ]).map((item) => ({
        ...item,
        isFlipped: false,
        success: false,
      }));

      setCards(shuffledData);
      setFlippedCards([]);
      setMatchedCards([]);
      setErrors(0);
      setSuccesses(0);
      setGameOver(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setIsButtonEnabled(!!e.target.value);
  };

  const handleDataChange = useCallback(() => {
    if (data) {
      const shuffledData: MemoryGameProps = shuffleArray([
        ...data.cardsData,
        ...data.cardsData
      ]).map((item) => ({
        ...item,
        isFlipped: false,
        success: false,
      }));

      setCards(shuffledData);
    }
  }, [status == "success"]);

  useEffect(() => {
    handleDataChange();
  }, [handleDataChange]);

  const handleCardClick = (uuid: string, url: string, isFlipped: boolean) => {
    if (isFlipped || disable) {
      return;
    }

    const updatedCards = cards?.map((card) =>
      card.uuid === uuid
        ? { ...card, isFlipped: true }
        : card
    );

    setCards(updatedCards || []);

    setFlippedCards([...flippedCards, { uuid, url, isFlipped, success: false }]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisable(true)
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.url === secondCard.url) {
        const updatedCards = cards?.map((card) =>
          card.url === firstCard.url || card.url === secondCard.url
            ? { ...card, success: true }
            : card
        );

        setCards(updatedCards || []);
        setMatchedCards([...matchedCards, firstCard.uuid, secondCard.uuid]);

        setSuccesses(successes + 1);

        if (matchedCards.length + 2 === cards?.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setErrors(errors + 1);

          const unmatchedCards = cards?.map((card) =>
            card.uuid === firstCard.uuid || card.uuid === secondCard.uuid
              ? { ...card, isFlipped: false }
              : card
          );

          setCards(unmatchedCards || []);
        }, 100);
      }
      setTimeout(() => {
        setFlippedCards([]);
        setDisable(false)
      }, 1000)

    }
  }, [flippedCards]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername)
      setIsGameStarted(true);
      setIsLoading(false)
    }
    setIsLoading(false)
  }, []);

  if (isLoading || status == "loading") {return <Skeleton />}
  
  return (
    <div className="memory-game">
      {!isGameStarted && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Memory Game</h2>
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 border rounded-lg"
                onChange={handleInputChange}
              />
              <button
                onClick={handleStartGameClick}
                className={`px-4 py-2 rounded-lg ${isButtonEnabled ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isButtonEnabled}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>

      )}
      {isGameStarted && (
        <>
          <div className="flex justify-center items-center mt-6">
            <TrackingTable
              userName={userName}
              errors={errors}
              successes={successes}
            />
          </div>

          <div className="memory-board flex flex-wrap justify-center items-center">
            {cards?.map((card, index) => (
              <MemoryCard
                key={card.uuid}
                index={index}
                success={card.success}
                url={card.url}
                isFlipped={flippedCards.some((c) => c.uuid === card.uuid)}
                onClick={() => handleCardClick(card.uuid, card.url, card.isFlipped)}
              />
            ))}
          </div>
          {gameOver && (
            <Modal onClick={handleRestart} username={userName} />
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
