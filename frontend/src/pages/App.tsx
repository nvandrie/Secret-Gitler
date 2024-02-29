import "../styling/App.css";
import LandingPage from "./LandingPage.tsx";
import LobbyPage from "./LobbyPages.tsx";
import GameplayPage from "./GamePlayPage.tsx";
import text_logo from '/text_logo.png';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5001/api')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <div className='LandingPage'>
        <img src={text_logo} alt="Image"/>
        {/* <p>Backend: {message}</p> */}
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/lobby" element={<LobbyPage/>} />
          <Route path="/game" element={<GameplayPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
