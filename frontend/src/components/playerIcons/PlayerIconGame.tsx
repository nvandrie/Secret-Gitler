import React, { useEffect, useState } from "react";
import x from "/misc/x.png"
import check from "/misc/check.png"


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
  const [eligible, setEligibleText] = useState("");
  const [display, setDisplay] = useState("display");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'tally_vote') {
        if (player.name === message.player) {
          setDisplay("display")
          setColor(message.color)
        }
      }
      if (message.type === "end_vote") {
        setDisplay("")
        if (message.uneligible){
        const isPlayerUneligible = message.uneligible.some((uneligibleName: string) => uneligibleName === player.name);
        if (isPlayerUneligible){
          setEligibleText("uneligible")
        } else {
          setEligibleText("eligible")
        }}
      }
      if (message.type === "start_vote") {
        setColor("white")
      }
      if (message.type === "draw_cards") {
        setColor("white")
      }
      if(message.type === "update_roles"){
        const isPlayerUneligible = message.uneligible.some((uneligibleName: string) => uneligibleName === player.name);
        if (isPlayerUneligible){
          setEligibleText("uneligible")
        } else {
          setEligibleText("eligible")
        }
      }
    };
    
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="player-icon">
      <svg className={`crown ${player.role}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <g className={player.role} stroke="black" strokeWidth="6">
              <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
          </g>
      </svg>
      <div className={`circle ${display} ${eligible}`}>
      {(color === 'green' || color === 'red') && display !== "display" ? (
        <img className="vote" src={color === 'green' ? check : x} alt="Vote" />
      ) : null}
      </div>
        <div className={`player-name`}>{player.name}</div>
    </div>
  );
};

export default PlayerIcon;