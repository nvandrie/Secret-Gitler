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
        <LiberalGameBoard
          outerStyle={{ backgroundColor: "navy" }} //outer
          cardStyle={{ backgroundColor: "lightyellow" }} //cards
        />
        <FacistGameBoard
          outerStyle={{ backgroundColor: "red" }} //outer
          cardStyle={{ backgroundColor: "lightyellow" }} //cards
        />
      </div>
    </div>
  );
}

export default GamePlay;
