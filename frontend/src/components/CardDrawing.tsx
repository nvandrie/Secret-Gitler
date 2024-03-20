import React, { useState, useEffect } from "react";
import fascist_policy_card from "/fascist_policy.png";
import liberal_policy_card from "/liberal_policy.png";
import "../styling/Gameplay.css";

interface Card {
  type: "facist" | "liberal";
  path: string;
}

interface CardDrawingProps {
  setSelectedCards: (cards: Card[]) => void;
}

const CardDrawing: React.FC<CardDrawingProps> = ({ setSelectedCards }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCardsState] = useState<Card[]>([]);
  const [isDeckVisible, setIsDeckVisible] = useState(true);
  const [isCardsVisible, setIsCardsVisible] = useState(true);

  const handleDeckClick = () => {
    // Generate three random cards
    const newCards: Card[] = [];
    for (let i = 0; i < 3; i++) {
      const type = Math.random() < 0.5 ? "facist" : "liberal";
      newCards.push({
        type,
        path: type === "facist" ? fascist_policy_card : liberal_policy_card,
      });
    }
    setCards(newCards);
    setIsCardsVisible(true);
    setIsDeckVisible(false);
    setSelectedCardsState([]);
  };

  const handleCardClick = (index: number) => {
    if (selectedCards.length < 2) {
      const updatedSelectedCards = [...selectedCards, cards[index]];
      setSelectedCardsState(updatedSelectedCards);

      const updatedCards = [...cards];
      updatedCards.splice(index, 1);
      setCards(updatedCards);

      if (updatedSelectedCards.length === 2) {
        setSelectedCards(updatedSelectedCards);
        setIsDeckVisible(true);
        setIsCardsVisible(false);
      }
    }
  };

  return (
    <div>
      <div>
        {isDeckVisible && <button onClick={handleDeckClick}>Deal Cards</button>}
      </div>
      <div className="card-display">
        {cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(index)}>
            {isCardsVisible && (
              <img className="draw-card" src={card.path} alt={card.type} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDrawing;
