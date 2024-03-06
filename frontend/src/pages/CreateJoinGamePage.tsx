import React from "react";
import "../styling/App.css";
import text_logo from "/text_logo.png";
import { Link } from "react-router-dom";

const CreateJoinGamePage = () => {
  return (
    <div>
      <img src={text_logo} alt="Image" className="image" />
      <div className="LandingButtonContainer">
        <Link to="/lobby">
          <button onClick={createLobby} className="LandingButton">
            Create Game
          </button>
        </Link>
        <Link to="/lobby">
          <button className="LandingButton">Join Game</button>
        </Link>
      </div>
    </div>
  );
};

const createLobby = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/create-lobby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create lobby");
    }

    const data = await response.json();
    console.log("Created lobby with ID:", data.id);
  } catch (error) {}
};

export default CreateJoinGamePage;

// import LobbyOptions from "../components/LobbyOptions";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// function LobbyOptionsPages() {
//   const lobbyOptions = ["default", "join", "create"];

//   const [authState, setAuthState] = useState<string>(lobbyOptions[0]);

//   return (
//     <div>
//       <LobbyOptions authState={authState} setAuthState={setAuthState} />
//       <Link to="/lobby">Create a Game</Link>
//       <Link to="/game">Game</Link>
//     </div>
//   );
// }

// const createLobby = async () => {
//   try {
//     const response = await fetch("http://localhost:5001/api/create-lobby", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create lobby");
//     }

//     const data = await response.json();
//     console.log("Created lobby with ID:", data.id);
//   } catch (error) {}
// };

// export default LobbyOptionsPages;
