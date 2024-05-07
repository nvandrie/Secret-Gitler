import express from "express";
import { sendChat } from "../controllers/chatController";

const router = express.Router();

router.post("/api/send-chat", sendChat);

export default router;
