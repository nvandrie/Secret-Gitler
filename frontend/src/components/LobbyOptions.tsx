import React from "react";
import { CSSProperties } from "react";

interface AuthProps {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}

const buttonStyle = {
  backgroundColor: "#E66443", // Orange background
  color: "white", // White Text
  padding: "10px 20px", // Padding around text
  margin: "5px", // Margin between buttons
  borderRadius: "15px", // Rounded Corners
  cursor: "pointer", // Pointer cursor on hover
  border: "none", // No border
  fontSize: "16px", // Text Size
  width: "200px", // Fixed width for all buttons
  fontFamily: "'Helvetica', sans-serif", // Font that we need to change
  boxShadow: "inset 0 10px 15px -10px rgba(0, 0, 0, 0.4)", // Internal drop shadow
};

const buttonContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center", // Center buttons horizontally
  justifyContent: "center", // Center buttons vertically
  flexDirection: "column", // Stack buttons vertically
};

const LobbyOptions: React.FC<AuthProps> = ({ authState, setAuthState }) => {
  return (
    <div>
      {authState === "default" && (
        <div style={buttonContainerStyle}>
          <button onClick={() => setAuthState("join")} style={buttonStyle}>
            {" "}
            Join a Game
          </button>
          <button onClick={() => setAuthState("create")} style={buttonStyle}>
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
