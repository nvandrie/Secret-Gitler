import React from "react";
import { CSSProperties } from "react";
import text_logo from '/text_logo.png';

interface AuthProps {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}

const LobbyOptions: React.FC<AuthProps> = ({ authState, setAuthState }) => {
  return (
    <div>
      <img src={text_logo} alt="Image" className = "image"/>
      {authState === "default" && (
        <div className="LandingButtonContainer">
          <button onClick={() => setAuthState("join")} className="LandingButton">
            {" "}
            Join a Game
          </button>
          <button onClick={() => setAuthState("create")} className="LandingButton">
            Create a Game
          </button>
        </div>
      )}
      {authState === "join" && <p>Join a Game component here</p>}
      {authState === "create" && <p>Create a Game component here</p>}
    </div>
  );
};

export default LobbyOptions;
