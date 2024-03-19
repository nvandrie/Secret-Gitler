import { Lobby } from "../models/Lobby";
import express from "express";
import { createLobby } from "../controllers/lobbyControl";

const router = express.Router();
// Holds the lobbies currently made
let lobbies: Lobby[] = [];

// Route to create a new lobby
router.post("/api/create-lobby", createLobby);

export default router