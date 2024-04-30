import React, { useEffect, useState } from "react";
import "../styling/Gameplay.css";


const tooltipBar: React.FC = () => {
  const [message, setMessage] = useState("Welcome to Secret Hitler");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // if (message.type === "end_vote") {
      //   setMessage("")
      // }
      // if (message.type === "start_vote") {
      //   setMessage("white")
      // }
      // if (message.type === "draw_cards") {
      //   setMessage("white")
      // }
    };
    
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="rolling-banner">
      <div className="rolling-text">{message}</div>
    </div>
  );
};

export default tooltipBar;
