import "../styling/Gameplay.css";
import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FacistGameBoard from "../components/GameBoards/FacistBoard";

const GamePlayPage = () => {
    return (
        <div className="grid-container">
            <div className="players-display">
            </div>
            <div className="gameboards">
                <LiberalGameBoard />
                <FacistGameBoard />
            </div>
            <div className="draw-cards"></div>
            <div className="chat-pop-up"></div>
            <div className="display-role"></div>
        </div>
    );
  };
  export default GamePlayPage;
