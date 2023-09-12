import React from "react";
import AnonymousCard from "../assets/img/anonymous-card.png";

interface MemoryCardProps {
  url: string;
  success: boolean;
  isFlipped: boolean;
  index: number;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ url, isFlipped, onClick, success, index }) => {

  return (
    <div className={"memory-card "} onClick={() => !isFlipped && onClick()}>
      <div className="back border rounded-lg min-h-52 w-200 m-5 hover:bg-gray-300 cursor-pointer bg-gray-500 p-4">
        <img
          className="border rounded-lg h-52"
          src={success || isFlipped ? url : AnonymousCard}
          alt="Card"
          width={200}
        />
        <div className="flex justify-center items-center text-cyan-50" >
          {index}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
