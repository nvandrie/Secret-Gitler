import React, { useState, useEffect } from "react";
import fascist_policy_card from "/policy_cards/fascist_policy.png";
import liberal_policy_card from "/policy_cards/liberal_policy.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setDiscardedCards } from "../../slices/deckSlice";

interface Card {
  type: "fascist" | "liberal";
  path: string;
}

interface CardDrawingProps {
  setSelectedCards: (cards: Card[]) => void;
}

const CardDrawing: React.FC<CardDrawingProps> = ({ setSelectedCards }) => {
  const [selectedCards, setSelectedCardsState] = useState<Card[]>([]);
  const [isCardsVisible, setIsCardsVisible] = useState(true);
  const dispatch = useDispatch();
  const currentCards = useSelector(
    (state: RootState) => state.deck.currentCards
  );
  const discardedCards = useSelector(
    (state: RootState) => state.deck.discardedCards
  );

  const convertDataToCards = (data: string[]): Card[] => {
    return data.map((type) => ({
      type: type as "fascist" | "liberal",
      path: type === "fascist" ? fascist_policy_card : liberal_policy_card,
    }));
  };

  useEffect(() => {
    setIsCardsVisible(true);
    setSelectedCardsState([]);
  }, [currentCards]);

  const handleCardClick = (index: number) => {
    if (isCardsVisible && selectedCards.length < 2) {
      const clickedCard = convertDataToCards([currentCards[index]])[0];
      setSelectedCardsState([...selectedCards, clickedCard]);
      if (selectedCards.length === 1) {
        setSelectedCards([...selectedCards, clickedCard]);
        setIsCardsVisible(false);
        dispatch(setDiscardedCards(discardedCards + 1));
      }
    }
  };

  return (
    <div>
      <div className="card-display">
        {convertDataToCards(currentCards).map((card, index) => (
          <div key={index} onClick={() => handleCardClick(index)}>
            {isCardsVisible && (
              <img className="card" src={card.path} alt={card.type} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDrawing;
