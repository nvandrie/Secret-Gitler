import React, { useState, useEffect  } from 'react';
import "../../styling/Gameplay.css";

interface Card {
  type: 'facist' | 'liberal';
  path: string;
}

interface CardDrawingProps {
  setSelectedCards: (cards: Card[]) => void;
  deck_cards: Card[];
}

const CardDrawing: React.FC<CardDrawingProps> = ({ setSelectedCards, deck_cards }) => {
  const [selectedCards, setSelectedCardsState] = useState<Card[]>([]);
  const [isCardsVisible, setIsCardsVisible] = useState(true);

  useEffect(() => {
    setIsCardsVisible(true);
    setSelectedCardsState([]);
  }, [deck_cards]);

  const handleCardClick = (index: number) => {
    if (selectedCards.length < 2) {
      const updatedSelectedCards = [...selectedCards, deck_cards[index]];
      setSelectedCardsState(updatedSelectedCards);

      if (updatedSelectedCards.length === 2) {
        setSelectedCards(updatedSelectedCards);
        setIsCardsVisible(false)
      }
    }
  };

  return (
    <div>
      <div className="card-display">
        {deck_cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(index)}>
            {isCardsVisible && (<img className="card" src={card.path} alt={card.type} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDrawing;
