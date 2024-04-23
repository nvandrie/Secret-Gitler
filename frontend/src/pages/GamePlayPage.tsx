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
import ElectionTracker from "../components/ElectionTracker/ElectionTracker";
import { toggleVotingActivity } from "../slices/voteSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EndGame from "../components/EndGame";
import { useAppSelector } from "../hooks/redux-hooks";
import { searchRoleByName } from "../components/IdentityCheck";

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
  const [presIndex, setPresIndex] = useState<number>(0);
  const [gameState, setGame] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const dispatch = useDispatch();
  const lobbyId = useSelector((state: RootState) => state.lobby.variable);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  const updatePresident = async () => {
    if (basicUserInfo?.name) {
      const identity = await searchRoleByName(basicUserInfo?.name);
      if (identity === "president") {
        setPlayers((prevPlayers) => {
          console.log(prevPlayers)
          const newPlayers = [...prevPlayers];
          newPlayers[presIndex].role = "default";
          const newPresIndex =
            presIndex === players.length - 1 ? 0 : presIndex + 1;
          newPlayers[newPresIndex].role = "president";
          axiosInstance.post("/api/set-president", {
            player: newPlayers[newPresIndex].name,
          });
          setPresIndex(newPresIndex);
          return newPlayers;
        });
        updateChancellor(-1);
      }
    }
  };

  const updateChancellor = async (index: number) => {
    if (basicUserInfo?.name) {
      const identity = await searchRoleByName(basicUserInfo?.name);
      if (identity === "president") {
        if (index !== -1) {
          // make api call to start voting
          axiosInstance.post("/api/start-vote", { player: players[index] });
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
        // const lobby = await axiosInstance.post(`/api/get-lobby`, {
        //   lobbyId: lobbyId,
        // });
        // await axiosInstance.post(`/api/initalize-players`, {
        //   players: JSON.stringify(lobby.data.players),
        // });
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
      <div>{gameState && <EndGame result={result} />}</div>
    </div>
  );
};

export default GamePlayPage;
