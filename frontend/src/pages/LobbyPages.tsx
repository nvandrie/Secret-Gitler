import LobbyOptions from "../components/LobbyOptions";
import { useState } from "react";
import { Link } from 'react-router-dom';

function LobbyPage() {
  const landingOptions = ["default", "join", "create"];

  const [authState, setAuthState] = useState<string>(landingOptions[0]);

  return (
    <div>
      <LobbyOptions authState={authState} setAuthState={setAuthState} />
      <Link to="/game">Game</Link>
    </div>
  );
}

export default LobbyPage;
