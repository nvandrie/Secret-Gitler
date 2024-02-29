import React from "react";

interface AuthProps {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}

const LobbyOptions: React.FC<AuthProps> = ({ authState, setAuthState }) => {
  return (
    <div>
      {authState === "default" && (
        <div>
          <button onClick={() => setAuthState("login")}>Join a Game</button>
          <button onClick={() => setAuthState("signup")}>Create a Game</button>
        </div>
      )}
      {authState === "join" && <p>Join a Game component here</p>}
      {authState === "create" && <p>Create a Game component here</p>}
    </div>
  );
};

export default LobbyOptions;
