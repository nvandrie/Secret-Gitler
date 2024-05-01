import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Lobby } from "../models/Lobby";
import { broadcastMessage } from "../index";

let lobbies: Lobby[] = [];

// Creates a lobby controller
const createLobby = asyncHandler(async (req: Request, res: Response) => {
  // Generate a unique ID for the lobby
  const id = Math.random().toString(36).substring(7);

  // Create a new lobby with an empty player list
  const newLobby: Lobby = {
    id,
    players: [],
  };

  // Add the new lobby to the list of lobbies
  lobbies.push(newLobby);

  // Send a success response with the ID of the created lobby
  res.json({ id });
});

// adds a player to the lobby
const addPlayer = (req: Request, res: Response): void => {
  const playerId = req.body.player;
  const lobbyId = req.body.lobbyCode;

  // Find the lobby with the given lobbyId
  const lobbyIndex = lobbies.findIndex((lobby) => lobby.id === lobbyId);

  // Check if the lobby exists
  if (lobbyIndex === -1) {
    res.status(404).json({ error: "Lobby not found" });
    return;
  }

  // Add the player to the lobby's list of players
  lobbies[lobbyIndex].players.push(playerId);

  broadcastMessage({ type: "new_player", player: playerId });

  res.json(lobbies[lobbyIndex]);
};

// gets the lobby
const getLobby = (req: Request, res: Response) => {
  const lobbyId = req.body.lobbyId;

  const lobbyIndex = lobbies.findIndex((lobby) => lobby.id === lobbyId);
  const lobby = lobbies[lobbyIndex];

  res.json(lobby);
};

export { createLobby, addPlayer, getLobby };
