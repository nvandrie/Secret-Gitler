import React, { useEffect, useState } from "react";
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FascistGameBoard from "../components/GameBoards/FascistBoard";
import CardDrawing from "../components/DeckActions/CardDrawing";
import CardSelecting from "../components/DeckActions/CardSelecting";
import Deck from "../components/DeckActions/Deck";
import Popup from "../components/popups/PlayerIdentityPopup";
import Chat from "../components/popups/ChatPopup";
import PlayerIconGame from "../components/PlayerIconGame";
import Vote from "../components/popups/Vote";
import { toggleVotingActivity } from "../slices/voteSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Card {
  type: "fascist" | "liberal";
  path: string;
}

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
  identity: "fascist" | "hitler" | "liberal";
}

const GamePlayPage = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [presIndex, setPresIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const lobbyId = useSelector((state: RootState) => state.lobby.variable);

  const updatePresident = () => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[presIndex].role = "default";
      const newPresIndex = presIndex === players.length - 1 ? 0 : presIndex + 1;
      newPlayers[newPresIndex].role = "president";
      setPresIndex(newPresIndex);
      return newPlayers;
    });
    updateChancellor(-1);
  };

  const updateChancellor = (index: number) => {
    if (index !== -1) {
      dispatch(toggleVotingActivity());
    }
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers.forEach((player, i) => {
        if (i === index && player.role !== "president") {
          player.role = "chancellor";
        } else if (player.role === "chancellor") {
          player.role = "default";
        }
      });
      return newPlayers;
    });
  };

  useEffect(() => {
    const initializePlayers = async () => {
      try {
        const lobby = await axiosInstance.post(`/api/get-lobby`, {
          lobbyId: lobbyId,
        });
        const response = await axiosInstance.post(`/api/initalize-players`, {
          players: JSON.stringify(lobby.data.players),
        });
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    initializePlayers();
  }, []);

  return (
    <>
      <div className="grid-container">
        <div className="players-display">
          {players &&
            players.map((player, index) => (
              <div key={index}>
                <div onClick={() => updateChancellor(index)}>
                  <PlayerIconGame player={player} />
                </div>
              </div>
            ))}
          <button onClick={updatePresident}>Update President</button>
        </div>
        <div className="gameboards">
          <LiberalGameBoard />
          <FascistGameBoard />
        </div>
        <div className="draw-cards">
          <div className="drawing-area">
            <CardDrawing setSelectedCards={setSelectedCards} />
          </div>
          <div className="deck-area">
            <Deck />
          </div>
          <div className="selection-area">
            <CardSelecting selectedCards={selectedCards} />
          </div>
        </div>
      </div>
      <Chat />
      <Popup />
      <Vote />
    </>
  );
};

export default GamePlayPage;
