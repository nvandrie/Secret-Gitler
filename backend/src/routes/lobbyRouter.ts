import express from "express";
import { createLobby } from "../controllers/lobbyControl";

const router = express.Router();

// Route to create a new lobby
router.post("/api/create-lobby", createLobby);

export default router