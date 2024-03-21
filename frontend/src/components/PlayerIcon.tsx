import React from "react";

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
}

interface PlayerIconProps {
  player: Player;
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  return (
    <div className="player-icon">
      <div className="circle"></div>
      <div className={player.role}>
        <div className="player-name">{player.name}</div>
      </div>
    </div>
  );
};

export default PlayerIcon;
