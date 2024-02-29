import "../styling/App.css";
import LandingPage from "./LandingPage.tsx";
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
    <div>
      <p>Message from backend: {message}</p>
      <LandingPage />
    </div>
  );
}

export default App;
