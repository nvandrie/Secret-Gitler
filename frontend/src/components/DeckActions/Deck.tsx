import React, { useEffect, useState } from "react";
import "../../styling/Gameplay.css";
import axiosInstance from "../../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setCurrentCards,
  setDiscardedCards,
  setRemainingCards,
  setDraw,
} from "../../slices/deckSlice";
import { searchRoleByName } from "../functions/IdentityCheck";
import { useAppSelector } from "../../hooks/redux-hooks";

const Deck: React.FC = () => {
  const dispatch = useDispatch();
  const remainingCards = useSelector(
    (state: RootState) => state.deck.remainingCards
  );
  const discardedCards = useSelector(
    (state: RootState) => state.deck.discardedCards
  );
  const canDraw = useSelector((state: RootState) => state.deck.canDraw);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const getPlayerRole = async () => {
      if (basicUserInfo?.name) {
        const identity = await searchRoleByName(basicUserInfo?.name);
        setRole(identity || "");
      }
    };

    getPlayerRole();

    const intervalId = setInterval(getPlayerRole, 5000);

    return () => clearInterval(intervalId);
  }, [basicUserInfo]);

  useEffect(() => {
    const createNewDeck = async () => {
      try {
        await axiosInstance.post("/api/new-deck");
        dispatch(setRemainingCards(17));
        dispatch(setDiscardedCards(0));
      } catch (error) {
        console.error("Error creating new deck:", error);
      }
    };
    createNewDeck();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "draw_cards") {
        if (basicUserInfo?.name) {
          const identity = await searchRoleByName(basicUserInfo?.name);
          if (identity !== "president") {
            const response = await axiosInstance.post("/api/get-cards");
            dispatch(setCurrentCards(["default", "default", "default"]));
            dispatch(setRemainingCards(response.data.remainingCards.length));
            dispatch(setDiscardedCards(response.data.discardCards.length - 3));
            dispatch(setDraw(false));
          }
        }
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleDeckClick = async () => {
    if (basicUserInfo?.name) {
      const identity = await searchRoleByName(basicUserInfo?.name);
      if (identity === "president") {
        if (canDraw) {
          try {
            const response = await axiosInstance.post("/api/draw-cards");
            dispatch(setCurrentCards(response.data.drawnCards));
            dispatch(setRemainingCards(response.data.remainingCards.length));
            dispatch(setDiscardedCards(response.data.discardCards.length - 3));
            dispatch(setDraw(false));
          } catch (error) {
            console.error("Deck not found");
            await axiosInstance.post("/api/new-deck");
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="deck">
        <h3 className="deck-text">Draw</h3>
        <div className={"deck-rectangle"} onClick={handleDeckClick}>
          <div
            className={
              `inner-rectangle ${role}` + (canDraw ? " deck-highlight" : "")
            }
          >
            <p className="cards-count">{remainingCards}</p>
          </div>
        </div>
      </div>
      <div className="deck">
        <h3 className="deck-text">Discard</h3>
        <div className="deck-rectangle">
          <div className="inner-rectangle">
            <p className="cards-count">{discardedCards}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
