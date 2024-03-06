import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../store";

const LobbyPage: React.FC = () => {

  const variable = useSelector((state: RootState) => state.lobby.variable);
  
  return <p>{variable}</p>;
};

export default LobbyPage;
