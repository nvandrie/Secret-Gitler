import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import PlayerIcon from "../components/PlayerIcon";

const LobbyPage: React.FC = () => {
  const variable = useSelector((state: RootState) => state.lobby.variable);
  const [players, setPlayers] = useState<Player[]>(playerData);

  return (
    <div className="GenericPage">
      <div>
        <h1 className="game-code">{variable}</h1>
        <Link to="/game">
          <button className="LandingButton">Start Game</button>
        </Link>
      </div>
      <div className="players-display-horizontal">
        {players.map((player, index) => (
          <div key={index}>
            <PlayerIcon player={player} />
          </div>
        ))}
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
