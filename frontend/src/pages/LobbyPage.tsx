import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PlayerIcon from "../components/PlayerIcon";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axiosInstance';


const LobbyPage: React.FC = () => {
  const variable = useSelector((state: RootState) => state.lobby.variable);
  const [players, setPlayers] = useState<Player[]>(playerData);
  const navigate = useNavigate();

  const startGame = async () => {
    await axiosInstance.post('/api/create-game');
    navigate("/game");
  }

  return (
    <div className="GenericPage">
      <h1 className="game-code">{variable}</h1>
      <div className="players-display-horizontal">
        {players.map((player, index) => (
          <div key={index}>
            <PlayerIcon player={player} />
          </div>
        ))}
      </div>
        <div className="ButtonContainer" onClick={startGame}>
          <button className="Button">Start Game</button>
        </div>
    </div>
  );
};

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
}

let playerData: Player[] = [
  { name: "Player1", role: "default" },
  { name: "Player2", role: "default" },
  { name: "Player3", role: "default" },
  { name: "Player4", role: "default" },
  { name: "Player5", role: "default" },
  { name: "Player6", role: "default" },
];

export default LobbyPage;
