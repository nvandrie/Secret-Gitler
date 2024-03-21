import React, { useState } from "react";
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FacistGameBoard from "../components/GameBoards/FacistBoard";
import CardDrawing from "../components/DeckActions/CardDrawing";
import CardSelecting from "../components/DeckActions/CardSelecting";
import Deck from "../components/DeckActions/Deck";
import PlayerIcon from "../components/PlayerIcon";

interface Card {
  type: "facist" | "liberal";
  path: string;
}

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
}

const playerData: Player[] = [
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
  const [presIndex, setPresIndex] = useState<number>(0);
  const [chanIndex, setChanIndex] = useState<number>(-1);

  const updatePresident = () => {
    setChanIndex(-1);
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[presIndex].role = "default";
      const newPresIndex = presIndex === players.length - 1 ? 0 : presIndex + 1;
      newPlayers[newPresIndex].role = "president";
      setPresIndex(newPresIndex);
      return newPlayers;
    });
  };

  const updateChancellor = (index: number) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers.forEach((player, i) => {
        if (i === index) {
          player.role = "chancellor";
        } else if (player.role === "chancellor") {
          player.role = "default";
        }
      });
      return newPlayers;
    });
  };

  const [drawnCards, setDrawnCards] = useState<Card[]>([]);

  return (
    <div className="grid-container">
      <div className="players-display">
        {players.map((player, index) => (
          <div key={index}>
            <div onClick={() => updateChancellor(index)}>
              <PlayerIcon player={player} />
            </div>
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
          <CardDrawing
            setSelectedCards={setSelectedCards}
            deck_cards={drawnCards}
          />
        </div>
        <div className="deck-area">
          <Deck setSelectedCards={setDrawnCards} />
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
