import React from "react";
import AnonymousCard from "../assets/img/anonymous-card.png";

interface MemoryCardProps {
  uuid: string;
  url: string;
  isFlipped: boolean;
  isCorrect: boolean; // Nueva prop para indicar si la carta es correcta
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ uuid, url, isFlipped, isCorrect, onClick }) => {
  return (
    <div
      className={`memory-card ${isFlipped ? "flipped" : ""} ${isCorrect ? "correct" : ""}`}
      onClick={() => !isFlipped && onClick()}
    >
      {!isFlipped ? ( // Mostrar la imagen frontal si isFlipped es true
        <div className="back border rounded-lg min-h-[330px] w-200 bg-gray-200">
          <img src={url} alt="Card" width={200} className="border rounded-lg" />
        </div>

      ) : ( // Mostrar la imagen trasera si isFlipped es false
        <div className="front relative border rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-300 m-5">
          <img src={AnonymousCard} alt="Card" width={200} />
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
