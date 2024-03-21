import React, { useState } from 'react';
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FacistGameBoard from "../components/GameBoards/FacistBoard";
import CardDrawing from "../components/DeckActions/CardDrawing";
import CardSelecting from "../components/DeckActions/CardSelecting";
import Deck from "../components/DeckActions/Deck"
import Popup from '../components/popups/PlayerIdentityPopup';
import Chat from '../components/popups/ChatPopup';

interface Card {
    type: 'facist' | 'liberal';
    path: string;
  }

const GamePlayPage = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);

  return (
    <>
    <div className="grid-container">
      <div className="players-display"></div>
      <div className="gameboards">
        <LiberalGameBoard />
        <FacistGameBoard />
      </div>
      <div className="draw-cards">
        <div className="drawing-area">
          <CardDrawing setSelectedCards={setSelectedCards} deck_cards = {drawnCards}/>
        </div>
        <div className="deck-area">
          <Deck setSelectedCards={setDrawnCards}/>
        </div>
        <div className="selection-area">
          <CardSelecting selectedCards={selectedCards}/>
        </div>
        
      </div>
    </div>
    <Chat/>
    <Popup/>
    </>
  );
};

export default GamePlayPage;

