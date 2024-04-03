import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PlayerIcon from "../components/PlayerIcon";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axiosInstance';

const LobbyPage: React.FC = () => {
  const lobbyId = useSelector((state: RootState) => state.lobby.variable);
  const [players, setPlayers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axiosInstance.post(`/api/get-lobby`, { lobbyId: lobbyId });
        setPlayers(response.data.players);

      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, [lobbyId]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'new_player') {
        console.log(message.player)
        setPlayers(prevPlayers => {
          if (!prevPlayers) {
            return [message.player];
          }
          return [...prevPlayers, message.player];
        });
      }
    };
  
    return () => {
      socket.close();
    };
  }, []);

  const startGame = async () => {
    await axiosInstance.post('/api/create-game');
    navigate("/game");
  }

  return (
    <div className="GenericPage">
      <h1 className="game-code">{lobbyId}</h1>
      {players ? (
        <div className="players-display-horizontal">
          {players.map((player, index) => (
            <div key={index}>
              <PlayerIcon player={player} />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading players...</div>
      )}
        <div className="ButtonContainer" onClick={startGame}>
          <button className="Button">Start Game</button>
        </div>
    </div>
  );
};

export default LobbyPage;
