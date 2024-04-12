import React, { useEffect, useState } from "react";
import "../../styling/Gameplay.css";
import axiosInstance from "../../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setFailedElections } from "../../slices/trackerSlice";

const ElectionTracker: React.FC = () => {
  const dispatch = useDispatch();
  const failedElections = useSelector(
    (state: RootState) => state.tracker.failedElections
  );

  useEffect(() => {
    const createNewTracker = async () => {
      try {
        await axiosInstance.post("/api/new-tracker");
        console.log("new tracker was made successfully");
        dispatch(setFailedElections(0));
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
      if (message.type === "check_play_card") {
        const response = await axiosInstance.post("/api/check-play-card");
        dispatch(setFailedElections(response.data.failedElections));
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleButtonClick = async () => {
    console.log("Fail an election button pressed1");
    const response = await axiosInstance.post("/api/check-play-card");
    dispatch(setFailedElections(response.data.failedElections));
    console.log("Fail an election button pressed");
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
