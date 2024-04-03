import React, { useState } from 'react';
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVariable } from "../slices/lobbySlice";


const JoinLobby: React.FC = () => {
  const [lobbyCode, setLobbyCode] = useState('');
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
      const lobby = await axiosInstance.post("/api/add-player", {player: basicUserInfo?.name, lobbyCode: lobbyCode});
      console.log("Lobby: ", lobby.data)
      setSuccessMessage("Successfully joined the lobby!");
      dispatch(setVariable(lobby.data.id))
      navigate("/lobby")
    } catch (error) {
      setError("Failed to join lobby. Please try again.");
      console.error("Error joining lobby:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Join Lobby</h2>
      <input
        type="text"
        placeholder="Enter Lobby Code"
        value={lobbyCode}
        onChange={(e) => setLobbyCode(e.target.value)}
      />
      <button onClick={handleJoinLobby} disabled={loading}>
        {loading ? 'Joining...' : 'Join Lobby'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default JoinLobby;
