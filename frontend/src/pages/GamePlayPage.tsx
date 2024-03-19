import LiberalGameBoard from "../components/GameBoards/LiberalBoard";
import FacistGameBoard from "../components/GameBoards/FacistBoard";

function GamePlay() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LiberalGameBoard />
        <FacistGameBoard />
      </div>
    </div>
  );
}

export default GamePlay;
