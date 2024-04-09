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
        dispatch(setFailedElections(0));
      } catch (error) {
        console.error("Error creating new tracker:", error);
      }
    };
    createNewTracker();
  }, []);

  return (
    <div className="container">
      <div className="tracker">
        <h3 className="tracker-text">Failed Elections</h3>
        <div className="rectangle">
          <div className="inner-rectangle">
            <p className="tracker-count">{failedElections}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionTracker;
