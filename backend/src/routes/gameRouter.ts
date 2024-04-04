import express from "express";
import { drawCards, newDeck, removeCard } from "../controllers/deckController";
import {addFascist, addLiberal, setPresident, setChancellor, createGame, initializePlayers} from "../controllers/gameplayController"

const router = express.Router();

// deck routes
router.post("/api/new-deck", newDeck);
router.post("/api/draw-cards", drawCards);
router.post("/api/remove-card", removeCard);

//presidency and chancellor update routes
router.post(`/api/initalize-players`, initializePlayers)
router.post("/api/set-president", setPresident);
router.post("/api/set-chancellor", setChancellor);

//game state routes
router.post("/api/create-game", createGame);
router.post("/api/add-fascist", addFascist);
router.post("/api/add-liberal", addLiberal);
export default router


