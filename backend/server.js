"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/server.ts
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 5001;
// Middleware to enable CORS
app.use((0, cors_1.default)());
// Holds the lobbies currently made
var lobbies = [];
// Route to create a new lobby
app.post("/api/create-lobby", function (req, res) {
    // Generate a unique ID for the lobby
    var id = Math.random().toString(36).substring(7);
    // Create a new lobby with an empty player list
    var newLobby = {
        id: id,
        players: [],
    };
    // Add the new lobby to the list of lobbies
    lobbies.push(newLobby);
    // Send a success response with the ID of the created lobby
    res.json({ id: id });
});
// Route to check if the server is connected
app.get("/api", function (req, res) {
    res.send("Connected");
});
// Start the server
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
// // backend/server.ts
// import express, { Request, Response } from "express";
// import cors from "cors";
// import { Lobby } from "./Lobby";
// const app = express();
// const port = 5001;
// // Holds the lobbies currently made
// let lobbies: Lobby[] = [];
// // Route to create a new lobby
// app.post("/api/create-lobby", (req: Request, res: Response) => {
//   // Generate a unique ID for the lobby
//   const id = Math.random().toString(36).substring(7);
//   // Create a new lobby with an empty player list
//   const newLobby: Lobby = {
//     id,
//     players: [],
//   };
//   // Add the new lobby to the list of lobbies
//   lobbies.push(newLobby);
//   // Send a success response with the ID of the created lobby
//   res.json({ id });
// });
// app.use(cors());
// app.get("/api", (req: Request, res: Response) => {
//   res.send("Connected");
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
