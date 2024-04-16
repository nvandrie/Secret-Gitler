import express from "express";
import {
  drawCards,
  newDeck,
  removeCard,
  getCard,
  startSelect,
  getTopCard,
} from "../controllers/deckController";
import {
  addFascist,
  addLiberal,
  setPresident,
  setChancellor,
  createGame,
  initializePlayers,
} from "../controllers/gameplayController";
import {
  newTracker,
  checkPlayCard,
  getTracker,
} from "../controllers/trackerController";

const router = express.Router();

// tracker routes
router.post("/api/new-tracker", newTracker);
router.post("/api/check-play-card", checkPlayCard);
router.post("/api/get-tracker", getTracker);

// deck routes
router.post("/api/new-deck", newDeck);
router.post("/api/draw-cards", drawCards);
router.post("/api/remove-card", removeCard);
router.post("/api/get-cards", getCard);
router.post("/api/start-select", startSelect);
router.post("/api/get-top-card", getTopCard);

//presidency and chancellor update routes
router.post(`/api/initalize-players`, initializePlayers);
router.post("/api/set-president", setPresident);
router.post("/api/set-chancellor", setChancellor);

//game state routes
router.post("/api/create-game", createGame);
router.post("/api/add-fascist", addFascist);
router.post("/api/add-liberal", addLiberal);
export default router;
