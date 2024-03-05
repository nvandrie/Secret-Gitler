import "../styling/App.css";
import LandingPage from "./LandingPage.tsx";
import CreateJoinGamePage from "./CreateJoinGamePage.tsx";
import LobbyPage from "./LobbyPage.tsx";
import GameplayPage from "./GamePlayPage.tsx";
import SignUp from "../components/SignUp.tsx";
import LogIn from "../components/LogIn.tsx";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styling/App.css";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5001/api")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <div className="GenericPage">
        {/* <p>Backend: {message}</p> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/createjoingamepage" element={<CreateJoinGamePage />} />
          <Route path="/game" element={<GameplayPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
