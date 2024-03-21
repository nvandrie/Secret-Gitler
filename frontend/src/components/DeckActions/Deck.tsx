import React from 'react';
import "../../styling/Gameplay.css";
import fascist_policy_card from "/fascist_policy.png";
import liberal_policy_card from "/liberal_policy.png";

interface Card {
    type: 'facist' | 'liberal';
    path: string;
  }

  interface DeckProps {
    setSelectedCards: (cards: Card[]) => void;
  }

const Deck: React.FC<DeckProps> = ({ setSelectedCards }) => {

    const handleDeckClick = () => {
        // Generate three random cards
        const newCards: Card[] = [];
        for (let i = 0; i < 3; i++) {
          const type = Math.random() < 0.6 ? 'facist' : 'liberal';
          newCards.push({ type, path: type === 'facist' ? fascist_policy_card : liberal_policy_card });
        }
        setSelectedCards(newCards);
      };

  return (
    <div className="container">
        <div className="deck">
        <h3 className="deck-text">Draw</h3>
            <div className="rectangle" onClick={handleDeckClick}>
                <div className="inner-rectangle"></div>
            </div>
      </div>
      <div className="deck">
        <h3 className="deck-text">Discard</h3>
            <div className="rectangle">
                <div className="inner-rectangle"></div>
            </div>
      </div>
    </div>
  );
};

export default Deck;