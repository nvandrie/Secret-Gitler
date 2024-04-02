// Stars a WebSocket client and connects to a server
import WebSocket from "ws";

const port = 1234;
const ws = new WebSocket("ws://localhost:1234");

ws.on("open", () => {
  console.log("[Client] Connected.");
  ws.send("Hi, this is a client!");
});
ws.on("message", (data) => {
  console.log("Received a message: ${data}");
});
