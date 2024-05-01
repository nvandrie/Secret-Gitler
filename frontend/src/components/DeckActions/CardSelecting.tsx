import "../../styling/Gameplay.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import fascist_policy_card from "/policy_cards/fascist_policy.png";
import liberal_policy_card from "/policy_cards/liberal_policy.png";
import { addElement } from "../../slices/fascistBoardSlice";
import { addLiberalElement } from "../../slices/liberalBoardSlice";
import { setDiscardedCards, setRemainingCards } from "../../slices/deckSlice";
import axiosInstance from "../../api/axiosInstance";
import { searchRoleByName } from "../functions/IdentityCheck";
import { useAppSelector } from "../../hooks/redux-hooks";

interface Card {
  type: "fascist" | "liberal" | "default";
  path: string;
}

interface CardSelectingProps {
  selectedCards: Card[];
}

const FASCIST_MAX_CARDS = 6;
const LIBERAL_MAX_CARDS = 5;

// handles the selecting of one card from the two cards to the right of the deck that appear
// when the chancellor needs to select a card to play on the boards.
const CardSelecting: React.FC<CardSelectingProps> = ({ selectedCards }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  const fascist_elements = useSelector(
    (state: RootState) => state.fascistBoard.elements
  );
  const liberal_elements = useSelector(
    (state: RootState) => state.liberalBoard.elements
  );

  // adds a libarl card to the board
  const addLiberalCard = () => {
    if (liberal_elements.length < LIBERAL_MAX_CARDS) {
      dispatch(
        addLiberalElement({
          path: liberal_policy_card,
          alt: "Liberal policy card",
        })
      );
    }
  };

  // adds a fascist card to the board
  const addFascistCard = () => {
    if (fascist_elements.length < FASCIST_MAX_CARDS) {
      dispatch(
        addElement({ path: fascist_policy_card, alt: "Fascist policy card" })
      );
    }
  };

  // handles if one of the two cards is clicked.
  // checks to see if player is chancellor and if so, calls the appropriate add card function
  // depending on the card type
  // also removes a card from the deck
  // upates the president
  // checks the game state for win condition
  const handleCardClick = async (card: Card) => {
    if (basicUserInfo?.name) {
      const identity = await searchRoleByName(basicUserInfo?.name);
      if (identity === "chancellor") {
        if (card.type === "liberal") {
          await axiosInstance.post("/api/add-liberal");
        } else {
          await axiosInstance.post("/api/add-fascist");
        }
        await axiosInstance.post("/api/remove-card", {
          cardToRemove: JSON.stringify(card.type),
        });
        setIsVisible(false);
        axiosInstance.post("/api/set-president");
        axiosInstance.post("/api/check-game");
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, [selectedCards]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    // displays the cards if should be displayed (if president has sent over two cards)
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "select_cards") {
        setIsVisible(true);
      }
      // calls the appropriate functions if a player clicks on the card
      // adds the appropate card to the discard pile
      if (message.type === "card_click") {
        setIsVisible(false);
        const response = await axiosInstance.post("/api/get-cards");
        dispatch(setDiscardedCards(response.data.discardCards.length));
        if (message.card === "liberal") {
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

  // correctly displays the two cards to the right of the deck at the appropriate time
  // display conditional upon player identity
  return (
    <div className="card-display">
      {selectedCards.map((card, index) => (
        <div
          className="selection-cards"
          key={index}
          onClick={() => handleCardClick(card)}
        >
          {isVisible && (
            <img
              className={`card ${card.type}`}
              src={card.path}
              alt={card.type}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardSelecting;
