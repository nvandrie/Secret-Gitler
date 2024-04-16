import { useNavigate } from "react-router-dom";
import "../styling/popup.css";
import React, { useEffect, useState } from 'react';

interface EndGameProps {
  result: string;
}

const EndGame: React.FC<EndGameProps> = ({ result }) => {
    const [winner, setWinner] = useState<string>('');
    const [winState, setWinState] = useState<string>('');
    const navigate = useNavigate();

  
    useEffect(() => {
      if (result === 'liberal board') {
        setWinner('Liberals');
        setWinState('Liberal board was filled');
      } else if (result === 'fascist board') {
        setWinner('Fascists');
        setWinState('Fascist board was filled');
      }
    }, [result]);
  
    const handleNavigate = () => {
      navigate("/home");
    };

  return (
          <div className="gamePopUp">
            <h1>The Game is Over!</h1>
            <h1>{winner} have won</h1>
            <h1>{winState}</h1>
            <button onClick={() => handleNavigate()}>Return Home</button>
          </div>
  );
};

export default EndGame;
