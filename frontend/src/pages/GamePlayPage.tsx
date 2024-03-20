import React, { useState } from "react";
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FacistGameBoard from "../components/GameBoards/FacistBoard";
import CardDrawing from "../components/CardDrawing";
import CardSelecting from "../components/CardSelecting";
import PlayerIcon from "../components/PlayerIcon";

interface Card {
  type: "facist" | "liberal";
  path: string;
}

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
}

let playerData: Player[] = [
  { name: "Player1", role: "president" },
  { name: "Player2", role: "default" },
  { name: "Player3", role: "default" },
  { name: "Player4", role: "default" },
  { name: "Player5", role: "default" },
  { name: "Player6", role: "default" },
];

const GamePlayPage = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>(playerData);
  const [presIndex, setPresIndex] = useState(0);

  const updatePresident = () => {
    setPresIndex(presIndex);
    let new_players = players.map((x) => x);
    new_players[presIndex].role = "default";
    if (presIndex !== players.length - 1) {
      setPresIndex(presIndex + 1);
    } else {
      setPresIndex(0);
    }
    new_players[presIndex].role = "president";
    setPlayers(new_players);
  };

  return (
    <div className="grid-container">
      <div className="players-display">
        {players.map((player, index) => (
          <div key={index}>
            <PlayerIcon player={player} />
          </div>
        ))}
        <button onClick={updatePresident}>Update President</button>
      </div>
      <div className="gameboards">
        <LiberalGameBoard />
        <FacistGameBoard />
      </div>
      <div className="draw-cards">
        <div className="drawing-area">
          <CardDrawing setSelectedCards={setSelectedCards} />
        </div>
        <div className="deck-area"></div>
        <div className="selection-area">
          <CardSelecting selectedCards={selectedCards} />
        </div>
      </div>
      <div className="chat-pop-up"></div>
      <div className="display-role"></div>
    </div>
  );
};

export default GamePlayPage;
