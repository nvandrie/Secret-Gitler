import LobbyOptions from "../components/LobbyOptions";
import { useState } from "react";

function LobbyPage() {
  const landingOptions = ["default", "join", "create"];

  const [authState, setAuthState] = useState<string>(landingOptions[0]);

  return (
    <div>
      <LobbyOptions authState={authState} setAuthState={setAuthState} />
    </div>
  );
}

export default LobbyPage;
