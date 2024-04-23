import React, { useEffect, useState } from "react";

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
  identity: "fascist" | "hitler" | "liberal"
}

interface PlayerIconGameProps {
  player: Player;
}

const PlayerIcon: React.FC<PlayerIconGameProps> = ({ player }) => {
  const [color, setColor] = useState("");
  const [colorState, setColorState] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'tally_vote') {
        if (player.name === message.player) {
          setColorState(message.color)
        }
      }
      if (message.type === 'end_vote') {
        setColor(colorState)
      }
      if (message.type === "start_vote") {
        setColor("white")
      }
      if (message.type === "draw_cards") {
        setColor("white")
      }
    };
    
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="player-icon">
      <div className="circle" style={{ backgroundColor: color }}></div>
      <div className={player.role}>
        <div className="player-name">{player.name}</div>
      </div>
    </div>
  );
};

export default PlayerIcon;