import '../../styling/Gameplay.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import fascist_policy_card from "/fascist_policy.png";
import liberal_policy_card from "/liberal_policy.png";
import { addElement } from "../../slices/facistBoardSlice";
import { addLiberalElement } from "../../slices/liberalBoardSlice";
import { setDiscardedCards } from '../../slices/deckSlice';
import axiosInstance from '../../api/axiosInstance';

interface Card {
  type: 'facist' | 'liberal';
  path: string;
}

interface CardSelectingProps {
  selectedCards: Card[];
}

const FACIST_MAX_CARDS = 6;
const LIBERAL_MAX_CARDS = 5;

const CardSelecting: React.FC<CardSelectingProps> = ({ selectedCards }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const facist_elements = useSelector((state: RootState) => state.facistBoard.elements);
    const liberal_elements = useSelector((state: RootState) => state.liberalBoard.elements);
    const discardedCards = useSelector((state: RootState) => state.deck.discardedCards);
  
    const addLiberalCard = async () => {
      if (liberal_elements.length < LIBERAL_MAX_CARDS) {
        dispatch(addLiberalElement({ path: liberal_policy_card, alt: "Liberal policy card" }));
        await axiosInstance.post('/api/remove-card', { cardToRemove: JSON.stringify("liberal") } );
      }
    };
  
    const addFacistCard = async () => {
      if (facist_elements.length < FACIST_MAX_CARDS) {
        dispatch(addElement({ path: fascist_policy_card, alt: "Fascist policy card" }));
        await axiosInstance.post('/api/remove-card', { cardToRemove: JSON.stringify("facist") } );
      }
    };
  
    const handleCardClick = (card: Card) => {
    if (card.type === 'liberal') {
        addLiberalCard();
    } else {
        addFacistCard();
    }
    setIsVisible(false);
    dispatch(setDiscardedCards(discardedCards+1))
  };

  useEffect(() => {
    setIsVisible(true);
  }, [selectedCards]);

  return (
    <div className="card-display">
      {selectedCards.map((card, index) => (
        <div className="selection-cards" key={index} onClick={() => handleCardClick(card)}>
          {isVisible && (<img className="card" src={card.path} alt={card.type} />)}
        </div>
      ))}
    </div>
  );
};

export default CardSelecting;
