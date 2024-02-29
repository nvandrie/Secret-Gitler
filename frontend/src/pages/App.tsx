import "../styling/App.css";
import LandingPage from "./LandingPage.tsx";
import text_logo from '/text_logo.png';
import React, { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5001/api')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='LandingPage'>
      <img src={text_logo} alt="Image"/>
      <p>Message from backend: {message}</p>
      <LandingPage />
    </div>
  );
}

export default App;
