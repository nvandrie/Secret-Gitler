import React, { useState, useEffect } from "react";
import fascist_policy_card from "/policy_cards/fascist_policy.png";
import liberal_policy_card from "/policy_cards/liberal_policy.png";
import default_card from "/policy_cards/policy_card_back.png"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setDiscardedCards } from "../../slices/deckSlice";
import axiosInstance from "../../api/axiosInstance";
import { useAppSelector } from "../../hooks/redux-hooks";
import { searchRoleByName } from "../functions/IdentityCheck";

interface Card {
  type: "fascist" | "liberal" | "default";
  path: string;
}

interface CardDrawingProps {
  setSelectedCards: (cards: Card[]) => void;
}

const CardDrawing: React.FC<CardDrawingProps> = ({ setSelectedCards }) => {
  const [selectedCards, setSelectedCardsState] = useState<Card[]>([]);
  const [isCardsVisible, setIsCardsVisible] = useState(true);
  const dispatch = useDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const currentCards = useSelector(
    (state: RootState) => state.deck.currentCards
  );

  const convertDataToCards = (data: string[]): Card[] => {
    return data.map((type) => {
        let path;
        switch (type) {
            case "fascist":
                path = fascist_policy_card;
                break;
            case "liberal":
                path = liberal_policy_card;
                break;
            default:
                path = default_card; 
                break;
        }
        return {
            type: type as "fascist" | "liberal" | "default",
            path: path
        };
    });
};

  useEffect(() => {
    setIsCardsVisible(true);
    setSelectedCardsState([]);
  }, [currentCards]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'select_cards') {
        if (basicUserInfo?.name){
          console.log(basicUserInfo?.name)
          const identity = await searchRoleByName(basicUserInfo?.name) 
          console.log(identity)
          if(identity !== "chancellor"){
            setSelectedCards(convertDataToCards(["default", "default"]))
          } else {
            setSelectedCards(message.cards)

          }
          setIsCardsVisible(false)
          const response = await axiosInstance.post("/api/get-cards");
          dispatch(setDiscardedCards(response.data.discardCards.length - 2)) 
      }}
    };
  
    return () => {
      socket.close();
    };
  }, []);

  const handleCardClick = async (index: number) => {
    if (basicUserInfo?.name){
      const identity = await searchRoleByName(basicUserInfo?.name) 
      if(identity === "president"){
        if (isCardsVisible && selectedCards.length < 2) {
          const clickedCard = convertDataToCards([currentCards[index]])[0];
          setSelectedCardsState([...selectedCards, clickedCard]);
          if (selectedCards.length === 1) {
            setSelectedCards([...selectedCards, clickedCard]);
            setIsCardsVisible(false);
            await axiosInstance.post("/api/start-select", {selectedCards: JSON.stringify([...selectedCards, clickedCard])})
          }
    }}}
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
