import React, { useState } from 'react';
import '../../styling/popup.css';

const Chat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`right-slide-out ${isVisible ? 'visible-chat' : ''}`}>   
      {isVisible && (
      <div className={`content-chat ${isVisible ? 'visible-chat' : ''}`}>
          <h1>Chat</h1>
          <div className="player-chat">
            <p>Player 1: I think player 2 is very questionable...</p>
          </div>
          <div className="personal-chat">
            <p>Player 2: That's funny that you say that, considering...</p>
          </div>
          </div>)}
      <div className="chat-trigger" onClick={toggleVisibility}>
        <p>{isVisible ? 'Hide Chat' : 'View Chat'}</p>
      </div>
    </div>

  );
};

export default Chat;
