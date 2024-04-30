import React from "react";


interface PlayerIconProps {
  player: string;
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  return (
    <div className="player-icon">
      <div className="circle"></div>
        <div className="player-name">{player}</div>
    </div>
  );
};

export default PlayerIcon;
