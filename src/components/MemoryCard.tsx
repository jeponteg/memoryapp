import React from "react";
import AnonymousCard from "../assets/img/anonymous-card.png";

interface MemoryCardProps {
  uuid: string;
  url: string;
  success: boolean;
  isFlipped: boolean;
  isCorrect: boolean; // Nueva prop para indicar si la carta es correcta
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ uuid, url, isFlipped, isCorrect, onClick, success }) => {
  return (
    <div
      className={`memory-card ${isFlipped ? "flipped" : ""} ${isCorrect ? "correct" : ""}`}
      onClick={() => !isFlipped && onClick()}
    >
      <div className="back border rounded-lg min-h-[330px] w-200 bg-gray-200 m-5">
        {!success ? <img src={url} alt="Card" width={200} className="border rounded-lg" />
          : <img src={AnonymousCard} alt="Card" width={200} />
        }

      </div>
    </div>
  );
};

export default MemoryCard;
