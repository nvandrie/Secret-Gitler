import express from "express";
import { drawCards, newDeck, removeCard } from "../controllers/deckController";

const router = express.Router();

router.post("/api/new-deck", newDeck);
router.post("/api/draw-cards", drawCards);
router.post("/api/remove-card", removeCard);

export default router



