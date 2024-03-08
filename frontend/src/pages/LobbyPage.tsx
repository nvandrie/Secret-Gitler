import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../store";
import { Link } from "react-router-dom";

const LobbyPage: React.FC = () => {

  const variable = useSelector((state: RootState) => state.lobby.variable);
  
  return (

    <div>
      <h1>{variable}</h1>
      <Link to="/game">
        <button className="LandingButton">Start Game</button>
      </Link>
    </div>

  );
};

export default LobbyPage;
