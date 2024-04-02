import "../styling/App.css";
import text_logo from "/text_logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVariable } from "../slices/lobbySlice";
import axiosInstance from "../api/axiosInstance";



const CreateJoinGamePage = () => {
  const dispatch = useDispatch();

  const createLobby = async () => {
    const response = await axiosInstance.post("/api/create-lobby");
    console.log("Created lobby with ID:", response.data.id);
    dispatch(setVariable(response.data.id));
  };


  return (
    <div className="GenericPage">
      <img src={text_logo} alt="Image" className="image" />
      <div className="ButtonContainer">
        <Link to="/lobby">
          <button onClick={createLobby} className="Button">
            Create Game
          </button>
        </Link>
        <Link to="/lobby">
          <button className="Button">Join Game</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateJoinGamePage;
