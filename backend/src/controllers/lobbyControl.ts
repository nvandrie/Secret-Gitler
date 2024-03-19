import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Lobby } from "../models/Lobby";

const createLobby = asyncHandler(async (req: Request, res: Response) => {
    let lobbies: Lobby[] = [];

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
  
  export { createLobby };