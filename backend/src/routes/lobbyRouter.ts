import express from "express";
import { createLobby, addPlayer, getLobby } from "../controllers/lobbyControl";

const router = express.Router();

// Route to create a new lobby
router.post("/api/create-lobby", createLobby);
router.post("/api/add-player", addPlayer)
router.post("/api/get-lobby", getLobby )

export default router