import React, { useEffect, useState } from "react";
import "../styling/Gameplay.css";

const tooltipBar: React.FC = () => {
  const [message, setMessage] = useState(
    "Welcome to Secret Hitler, a game of intrigue and social deduction. Don't forget to check your personal identity!"
  );

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "end_vote") {
        if (message.result == "pass") {
          setMessage(
            "The vote passed! The president has successfully elected a chancellor."
          );
        } else {
          setMessage(
            "Yikes! The consensus was that you two shouldn't be in government!"
          );
        }
      }
      if (message.type === "card_click") {
        if (message.action === "failure") {
          setMessage(
            "This president must really be hated... The presidency will now move on."
          );
        } else {
          setMessage(
            "The chancellor has enacted their policy. Was it what you expected? A new member is now president! Time for them to elect a new chancellor."
          );
        }
      }
      if (message.type === "select_cards") {
        setMessage(
          "The policies have secretly been passed to the chancellor who will enact the final choice!"
        );
      }
      if (message.type === "draw_cards") {
        setMessage("The president is picking their policies...");
      }
      if (message.type === "start_vote") {
        setMessage("Sshhhhhh..... People are voting.");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="rolling-banner">
      <div className="rolling-text">{message}</div>
    </div>
  );
};

export default tooltipBar;
