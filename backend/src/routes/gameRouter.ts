import express from "express";
import { drawCards, newDeck, clearDeck, removeCard, getCard, startSelect } from "../controllers/deckController";
import {addFascist, addLiberal, setPresident, setChancellor, createGame, initializePlayers, getPlayers, endGame} from "../controllers/gameplayController"

const router = express.Router();

// deck routes
router.post("/api/new-deck", newDeck);
router.post("/api/draw-cards", drawCards);
router.post("/api/remove-card", removeCard);
router.post("/api/get-cards", getCard);
router.post("/api/start-select", startSelect)

//presidency and chancellor update routes
router.post(`/api/initalize-players`, initializePlayers)
router.post("/api/set-president", setPresident);
router.post("/api/set-chancellor", setChancellor);

//game state routes
router.post("/api/create-game", createGame);
router.post("/api/end-game", [clearDeck, endGame]);
router.post("/api/add-fascist", addFascist);
router.post("/api/add-liberal", addLiberal);
router.post("/api/get-players", getPlayers)
export default router



