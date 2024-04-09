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

const resetTracker = (req: Request, res: Response): void => {
  const tracker = req.body;
  tracker.failedElections = 0;
  broadcastMessage({ type: "reset_tracker" });
};

const incrementTracker = (req: Request, res: Response): void => {
  const tracker = req.body;
  tracker.failedElections += 1;
  broadcastMessage({ type: "increment_tracker" });
};

const checkTracker = (req: Request, res: Response): boolean => {
  const tracker = req.body;
  if (tracker.failedElections === 3) {
    resetTracker(req, res);
    return true;
  } else {
    return false;
  }
};

const checkPlayCard = (req: Request, res: Response): boolean => {
  const tracker = req.body;
  incrementTracker(req, res);
  return checkTracker(req, res);
};
export { newTracker, checkPlayCard };
