import React from "react";
import "../styling/Gameplay.css";

type tooltipBarProps = {
  message: string;
};

const tooltipBar: React.FC<tooltipBarProps> = ({ message }) => {
  return (
    <div className="rolling-banner">
      <div className="rolling-text">{message}</div>
    </div>
  );
};

export default tooltipBar;
