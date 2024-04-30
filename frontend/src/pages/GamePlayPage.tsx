import React, { useEffect, useState } from "react";
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FascistGameBoard from "../components/GameBoards/FascistBoard";
import CardDrawing from "../components/DeckActions/CardDrawing";
import CardSelecting from "../components/DeckActions/CardSelecting";
import Deck from "../components/DeckActions/Deck";
import Popup from "../components/popups/PlayerIdentityPopup";
import Chat from "../components/popups/ChatPopup";
import StartGameStorytelling from "../components/popups/StartGameStorytelling";
import PlayerIconGame from "../components/playerIcons/PlayerIconGame";
import Vote from "../components/popups/Vote";
import ElectionTracker from "../components/ElectionTracker/ElectionTracker";
import { toggleVotingActivity } from "../slices/voteSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import EndGame from "../components/popups/EndGame";
import { useAppSelector } from "../hooks/redux-hooks";
import { searchRoleByName } from "../components/functions/IdentityCheck";
import TooltipBar from "../components/tooltipBar";

interface Card {
  type: "fascist" | "liberal" | "default";
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
  const [gameState, setGame] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const dispatch = useDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  const updateChancellor = async (index: number) => {
    if (basicUserInfo?.name) {
      const identity = await searchRoleByName(basicUserInfo?.name);
      const response = await axiosInstance.post("/api/get-uneligible")
      response.data.includes(players[index].name)
      if (identity === "president" && basicUserInfo?.name !== players[index].name) {
        if (index !== -1) {
          // make api call to start voting
          axiosInstance.post("/api/start-vote", { player: players[index] });
        }
      }
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "update_roles") {
        const response = await axiosInstance.post(`/api/get-players`);
        const players = response.data;
        setPlayers(players);
      }
      if (message.type === "start_vote") {
        dispatch(toggleVotingActivity());
      }
      if (message.type === "end_game") {
        setGame(true);
        setResult(message.result);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const initializePlayers = async () => {
      try {
        const players = await axiosInstance.post(`/api/get-players`);
        setPlayers(players.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    initializePlayers();

    const cleanup = async () => {
      await axiosInstance.post("/api/end-game");
    };
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="grid-container">
      <div className="tooltip" style={{ position: 'absolute', top: 0, width: '100%' }}>
      <TooltipBar/>
    </div>
      <div className="players-display">
        {players &&
          players.map((player, index) => (
            <div key={index}>
              <div onClick={() => updateChancellor(index)}>
                <PlayerIconGame player={player} />
              </div>
            </div>
          ))}
      </div>

      <div className="gameboards-and-tracker">
        <div className="gameboards">
          <LiberalGameBoard />
          <FascistGameBoard />
        </div>
        <div className="tracker">
          <ElectionTracker />
        </div>
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

      <Chat />
      <Popup />
      <Vote />
      <StartGameStorytelling />
      <div>{gameState && <EndGame result={result} />}</div>
    </div>
  );
};

export default GamePlayPage;
