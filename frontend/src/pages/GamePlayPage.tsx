import React, { useState } from 'react';
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FacistGameBoard from "../components/GameBoards/FacistBoard";
import CardDrawing from "../components/CardDrawing";
import CardSelecting from "../components/CardSelecting";

interface Card {
    type: 'facist' | 'liberal';
    path: string;
  }

const GamePlayPage = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  return (
    <div className="grid-container">
      <div className="players-display"></div>
      <div className="gameboards">
        <LiberalGameBoard />
        <FacistGameBoard />
      </div>
      <div className="draw-cards">
        <div className="drawing-area">
          <CardDrawing setSelectedCards={setSelectedCards}/>
        </div>
        <div className="deck-area">
          
        </div>
        <div className="selection-area">
          <CardSelecting selectedCards={selectedCards}/>
        </div>
        
      </div>
      <div className="chat-pop-up"></div>
      <div className="display-role"></div>
    </div>
  );
};

export default GamePlayPage;

