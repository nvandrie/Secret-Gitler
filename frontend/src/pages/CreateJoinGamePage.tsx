import "../styling/App.css";
import text_logo from "/logos/text_logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLobby } from "../slices/lobbySlice";
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../hooks/redux-hooks";


const CreateJoinGamePage = () => {
  const dispatch = useDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);


  const createLobby = async () => {
    const response = await axiosInstance.post("/api/create-lobby");
    console.log("Created lobby with ID:", response.data.id);
    dispatch(setLobby(response.data.id));
    const lobby = await axiosInstance.post("/api/add-player", {player: basicUserInfo?.name, lobbyCode: response.data.id});
    console.log("Lobby: ", lobby.data)
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
        <Link to="/join">
          <button className="Button">Join Game</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateJoinGamePage;
