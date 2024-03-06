// backend/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { Lobby } from "./Lobby";

const app = express();
const port = 5001;

// Middleware to enable CORS
app.use(cors());

// Holds the lobbies currently made
let lobbies: Lobby[] = [];

// Route to create a new lobby
app.post("/api/create-lobby", (req: Request, res: Response) => {
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

// Route to check if the server is connected
app.get("/api", (req: Request, res: Response) => {
  res.send("Connected");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

