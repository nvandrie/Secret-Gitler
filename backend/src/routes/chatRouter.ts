import express from "express";
import { getChats, sendChat } from "../controllers/chatController";

const router = express.Router();

router.post("/api/send-chat", sendChat);
router.post("/api/get-chats", getChats);

export default router;
