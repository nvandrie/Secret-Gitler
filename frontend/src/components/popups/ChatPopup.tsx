import React, { useEffect, useRef, useState } from "react";
import "../../styling/popup.css";
import axiosInstance from "../../api/axiosInstance";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Chat } from "../../../../backend/src/models/Chat";

const ChatPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<any>(null);

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "add_chat") {
        setChats((prevChats: Chat[]) => [...prevChats, message.newChat]);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const sendChat = () => {
    const newChat: Chat = {
      player: basicUserInfo?.name,
      content: input,
    };
    axiosInstance.post(`/api/send-chat`, { chat: newChat });
    setInput("");
  };

  return (
    <div className={`right-slide-out ${isVisible ? "visible-chat" : ""}`}>
      {isVisible && (
        <div className={`content-chat ${isVisible ? "visible-chat" : ""}`}>
          <h1>Chat</h1>
          <div className="player-chat" ref={chatContainerRef}>
            {chats.map((chat, index) => (
              <div key={index}>
                <p
                  className={
                    chat.player === basicUserInfo?.name ? "user-chat" : ""
                  }
                >
                  <span className="outlinedText">{chat.player}</span>:{" "}
                  {chat.content}
                </p>
              </div>
            ))}
          </div>
          <div className="personal-chat">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button disabled={!input.trim()} onClick={sendChat}>
              Send
            </button>
          </div>
        </div>
      )}
      <div className="chat-trigger" onClick={toggleVisibility}>
        <p>{isVisible ? "Hide Chat" : "View Chat"}</p>
      </div>
    </div>
  );
};

export default ChatPopup;
