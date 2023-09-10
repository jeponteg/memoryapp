import React from "react";
import AnonymousCard from "../assets/img/anonymous-card.png";

interface MemoryCardProps {
  uuid: string;
  url: string;
  success: boolean;
  isFlipped: boolean;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ uuid, url, isFlipped, onClick, success }) => {

  return (
    <div className={"memory-card"} onClick={() => !isFlipped && onClick()}>
      <div className="back border rounded-lg min-h-52 w-200 bg-gray-200 m-5 hover:bg-gray-300 cursor-pointer">
        <div>
          <img 
            className="border rounded-lg h-52" 
            src={success || isFlipped ? url : AnonymousCard} 
            alt="Card" 
            width={200} 
          />
          {uuid}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
