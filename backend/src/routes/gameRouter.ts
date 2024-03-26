import express from "express";
import { newDeck, updateDeck } from "../controllers/deckController";

const router = express.Router();

// Route to create a new lobby
router.post("/api/newDeck", newDeck);
router.post("/api/update-cards", updateDeck);

export default router