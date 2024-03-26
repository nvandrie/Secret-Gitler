import React, { useEffect, useState } from 'react';
import fascist_policy_card from "/fascist_policy.png";
import liberal_policy_card from "/liberal_policy.png";
import '../../styling/Gameplay.css';
import axiosInstance from '../../api/axiosInstance';


interface Card {
    type: 'liberal' | 'facist';
    path: string;
}

interface DeckProps {
    setSelectedCards: (cards: Card[]) => void;
}

const Deck: React.FC<DeckProps> = ({ setSelectedCards }) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [remainingCardsLength, setRemainingCardsLength] = useState(0)

  const convertDataToCards = (data: string[]): Card[] => {
    const newCards: Card[] = [];
    for (let i = 0; i < data.length; i++) {
      const type = data[i] as 'facist' | 'liberal';
      newCards.push({ type, path: type === 'facist' ? fascist_policy_card : liberal_policy_card });
    }
    return newCards;
  };


    useEffect(() => {
        const createNewDeck = async () => {
            try {
                const response = await axiosInstance.post('/api/newDeck');
                setDeck(convertDataToCards(response.data.remainingCards));
                setRemainingCardsLength(response.data.remainingCards.length)
            } catch (error) {
                console.error('Error creating new deck:', error);
            }
        };
        createNewDeck();
    }, []);

    const handleDeckClick = async () => {    
      const drawnCards = deck.slice(0, 3);
      setDeck(deck.slice(3));
      setSelectedCards(drawnCards);
    
      const response = await axiosInstance.post('/api/update-cards', { discardCards: drawnCards })
        setDeck(convertDataToCards(response.data.remainingCards))
        setRemainingCardsLength(response.data.remainingCards.length)
    };
    

    return (
        <div className="container">
            <div className="deck">
                <h3 className="deck-text">Draw</h3>
                <div className="rectangle" onClick={handleDeckClick}>
                    <div className="inner-rectangle">
                      <p className="cards-count">{remainingCardsLength}</p>
                    </div>
                </div>
            </div>
            <div className="deck">
                <h3 className="deck-text">Discard</h3>
                <div className="rectangle">
                    <div className="inner-rectangle">
                      <p className="cards-count">{17 - remainingCardsLength}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deck;
