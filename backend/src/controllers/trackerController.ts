import ElectionTracker from "../models/ElectionTracker";
import { Request, Response } from "express";
import { broadcastMessage } from "../index";

let tracker: ElectionTracker | null = null;

// Instantiates an Election Tracker Controller
const newTracker = (req: Request, res: Response): void => {
  const failedElections = 0;

  tracker = {
    failedElections: failedElections,
  };

  res.json(tracker);
};

// Sets failed elections to 0
const resetTracker = () => {
  if (tracker == null) {
    return;
  }

  tracker.failedElections = 0;
  broadcastMessage({ type: "reset_tracker" });
};

// gets the election tracker
const resetTrackerApi = (req: Request, res: Response): void => {
  if (tracker == null) {
    return;
  }

  tracker.failedElections = 0;
  broadcastMessage({ type: "reset_tracker" });
  res.json("")
};

// Increases failed elections by 1
const incrementTracker = () => {
  if (tracker == null) {
    return false;
  }

  tracker.failedElections += 1;
  broadcastMessage({ type: "increment_tracker" });
};

// checks whether or not the tracker has been filled.
// if filled, returns true and resets to 0
// else, returns false
const checkTracker = (): boolean => {
  if (tracker == null) {
    return false;
  }

  if (tracker.failedElections === 3) {
    resetTracker();
    return true;
  } else {
    return false;
  }
};

// gets the election tracker
const getTracker = (req: Request, res: Response): void => {
  res.json(tracker);
};

// called every time an election fails
// increments tracker by one, checks if a card should be played (if yes, also resets tracker)
// returns the tracker and broadcasts if a card should be played
const checkPlayCard = (req: Request, res: Response): void => {
  incrementTracker();
  checkTracker();
  broadcastMessage({ type: "check_play_card" });
  res.json(tracker);
};

export { newTracker, checkPlayCard, getTracker, resetTrackerApi };
