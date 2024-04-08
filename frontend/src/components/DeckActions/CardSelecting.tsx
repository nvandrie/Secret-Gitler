import "../../styling/Gameplay.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import fascist_policy_card from "/policy_cards/fascist_policy.png";
import liberal_policy_card from "/policy_cards/liberal_policy.png";
import { addElement } from "../../slices/facistBoardSlice";
import { addLiberalElement } from "../../slices/liberalBoardSlice";
import { setDiscardedCards } from "../../slices/deckSlice";
import axiosInstance from "../../api/axiosInstance";

interface Card {
  type: "facist" | "liberal"
  path: string;
}

interface CardSelectingProps {
  selectedCards: Card[];
}

const FASCIST_MAX_CARDS = 6;
const LIBERAL_MAX_CARDS = 5;

const CardSelecting: React.FC<CardSelectingProps> = ({ selectedCards }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const facist_elements = useSelector(
    (state: RootState) => state.facistBoard.elements 
  );
  const liberal_elements = useSelector(
    (state: RootState) => state.liberalBoard.elements
  );

  const addLiberalCard = () => {
    if (liberal_elements.length < LIBERAL_MAX_CARDS) {
      dispatch(
        addLiberalElement({ path: liberal_policy_card, alt: "Liberal policy card"})
      );
    }
  };

  const addFascistCard = () => {
    if (facist_elements.length < FASCIST_MAX_CARDS) {
      dispatch(
        addElement({ path: fascist_policy_card, alt: "Fascist policy card" })
      );
    }
  };

  const handleCardClick = async (card: Card) => {
    if (card.type === "liberal") {
      await axiosInstance.post("/api/add-liberal");
    } else {
      await axiosInstance.post("/api/add-fascist");
    }
    await axiosInstance.post("/api/remove-card", {
      cardToRemove: JSON.stringify(card.type),
    });
    setIsVisible(false);
  };

  useEffect(() => {
    console.log("Selected: " + selectedCards)
    setIsVisible(true);
  }, [selectedCards]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'select_cards') {
        setIsVisible(true)
      }
      if (message.type === 'card_click') {
        setIsVisible(false)
        const response = await axiosInstance.post("/api/get-cards");
        dispatch(setDiscardedCards(response.data.discardCards.length - 0))
        if(message.card === "liberal"){
          addLiberalCard();
        } else {
          addFascistCard();
        }
      }
      
    };
  
    return () => {
      socket.close();
    };
  }, []);

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
