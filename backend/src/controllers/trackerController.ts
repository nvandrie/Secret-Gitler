import ElectionTracker from "../models/ElectionTracker";
import { Request, Response } from "express";
import { broadcastMessage } from "../index";

let tracker: ElectionTracker | null = null;

const newTracker = (req: Request, res: Response): void => {
  const failedElections = 0;

  tracker = {
    failedElections: failedElections,
  };

  res.json(tracker);
};

const resetTracker = () => {
  if (tracker == null) {
    return;
  }

  tracker.failedElections = 0;
  broadcastMessage({ type: "reset_tracker" });
};

const incrementTracker = () => {
  if (tracker == null) {
    return false;
  }

  tracker.failedElections += 1;
  broadcastMessage({ type: "increment_tracker" });
};

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

const getTracker = (req: Request, res: Response): void => {
  res.json(tracker);
};

const checkPlayCard = (req: Request, res: Response): void => {
  incrementTracker();
  checkTracker();
  broadcastMessage({ type: "check_play_card" });
  res.json(tracker);
};

export { newTracker, checkPlayCard, getTracker };
