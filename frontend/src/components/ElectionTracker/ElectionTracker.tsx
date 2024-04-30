import React, { useEffect, useState } from "react";
import "../../styling/Gameplay.css";
import axiosInstance from "../../api/axiosInstance";
import FailedElectionCircles from "./FailedElectionCircles";
import { useAppSelector } from "../../hooks/redux-hooks";
import { searchRoleByName } from "../functions/IdentityCheck";

const ElectionTracker: React.FC = () => {
  const [failedElections, setFailedElections] = useState(0);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);


  useEffect(() => {
    const createNewTracker = async () => {
      try {
        await axiosInstance.post("/api/new-tracker");
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
        const response = await axiosInstance.post("/api/get-tracker");
        setFailedElections(response.data.failedElections);
      }
      if (message.type === "end_vote"){
        if (message.result === "fail"){
          if (basicUserInfo?.name) {
            const identity = await searchRoleByName(basicUserInfo?.name);
            if (identity === "president") {
              failAction()
            }
          }
        }
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const failAction = async () => {
    const tracker = await axiosInstance.post("/api/check-play-card");
    const numFailed = tracker.data.failedElections;
    console.log(numFailed)
    let play = false;
    if (numFailed === 0) {
      play = true;
    }

    if (play) {
      const response = await axiosInstance.post("/api/get-top-card");
      const card = response.data.topCard;
      if (JSON.stringify(card[0]) === JSON.stringify("liberal")) {
        await axiosInstance.post("/api/add-liberal");
      } else {
        await axiosInstance.post("/api/add-fascist");
      }
      play = false;
    }
  };

  return (
    <div className="container">
      <div className="tracker">
        <h3 className="tracker-text">Failed Elections</h3>
            <FailedElectionCircles count={failedElections} />
      </div>
    </div>
  );
};

export default ElectionTracker;
