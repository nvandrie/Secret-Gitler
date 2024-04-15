import React, { useEffect, useState } from "react";
import "../../styling/Gameplay.css";
import axiosInstance from "../../api/axiosInstance";

const ElectionTracker: React.FC = () => {
  const [failedElections, setFailedElections] = useState(0);


  useEffect(() => {
    const createNewTracker = async () => {
      try {
        await axiosInstance.post("/api/new-tracker");
        console.log("new tracker was made successfully");
      } catch (error) {
        console.error("Error creating new tracker:", error);
      }
    };
    createNewTracker();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log(message.type)
      if (message.type === "check_play_card") {
        const response = await axiosInstance.post("/api/get-tracker");
        setFailedElections(response.data.failedElections)
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleButtonClick = async () => {
    await axiosInstance.post("/api/check-play-card");
  };

  return (
    <div className="container">
      <div className="tracker">
        <h3 className="tracker-text">Failed Elections</h3>
        <div className="tracker-rectangle">
          <div className="tracker-inner-rectangle">
            <button onClick={handleButtonClick}>Fail an Election</button>
            <p className="tracker-count">{failedElections}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionTracker;
