import { Request, Response } from "express";
import { Chat } from "../models/Chat";
import { broadcastMessage } from "..";

let gameChat: Chat[] = [];

const sendChat = (req: Request, res: Response): void => {
  if (req == null) {
    res.status(500).json({ error: "Chat was not received from client" });
  }
  const { chat } = req.body;
  gameChat.push(chat);
  broadcastMessage({ type: "add_chat", newChat: chat });
  res.json("Chat message received");
};

export { sendChat };
