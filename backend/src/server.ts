import { WebSocketServer } from "ws";

const port = 1234;
const wss = new WebSocketServer({ port });

// Define WebSocketServer Behavior
wss.on("connection", (ws) => {
  // handles new connections

  ws.on("message", (data) => {
    console.log("Recieved message from client!");
  });

  ws.send("Hellow, this is server.ts");
});

console.log("Listening at ${port}...");
