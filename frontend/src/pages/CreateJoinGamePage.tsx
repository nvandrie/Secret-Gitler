import "../styling/App.css";
import text_logo from "/text_logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setVariable } from "../slices/lobbySlice";

const CreateJoinGamePage = () => {

  const dispatch = useDispatch();

  const createLobby = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/create-lobby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to create lobby");
      }
  
      const data = await response.json();
      console.log("Created lobby with ID:", data.id);
      dispatch(setVariable(data.id));
    } catch (error) {}
  };

  return (
    <div>
      <img src={text_logo} alt="Image" className="image" />
      <div className="LandingButtonContainer">
        <Link to="/lobby">
          <button onClick={createLobby} className="LandingButton">
            Create Game
          </button>
        </Link>
        <Link to="/register">
          <button className="LandingButton">Join Game</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateJoinGamePage;









