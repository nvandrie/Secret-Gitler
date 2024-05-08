import React, { useState } from "react";
import "../styling/App.css";
import text_logo from "/logos/text_logo.png";
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLobby } from "../slices/lobbySlice";
import { TextField } from "@mui/material";

/*
Page where users can type in already-generated lobby codes to join same game as their friends.
Handles if lobby does not exist.
*/
const JoinLobby: React.FC = () => {
  const [lobbyCode, setLobbyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoinLobby = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const lobby = await axiosInstance.post("/api/add-player", {
        player: basicUserInfo?.name,
        lobbyCode: lobbyCode,
      });
      setSuccessMessage("Successfully joined the lobby!");
      dispatch(setLobby(lobby.data.id));
      navigate("/lobby");
    } catch (error) {
      setError("Failed to join lobby. Please try again.");
      console.error("Error joining lobby:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="GenericPage">
      <img src={text_logo} alt="Image" className="image" />
      <div>
        <div className="ButtonContainer">
          <div className="join-lobby-text">Join Lobby</div>
          <TextField
            type="text"
            placeholder="Enter Lobby Code"
            value={lobbyCode}
            onChange={(e) => setLobbyCode(e.target.value)}
            className="TextField"
            sx={{ "& fieldset": { border: "none" } }}
          />
          <button
            onClick={handleJoinLobby}
            disabled={loading}
            className="Button"
          >
            {loading ? "Joining..." : "Join Lobby"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default JoinLobby;
