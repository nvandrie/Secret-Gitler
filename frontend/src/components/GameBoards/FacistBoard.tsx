import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addElement } from "../../slices/facistBoardSlice";
import fascist_policy_card from "/fascist_policy.png";
import fascist_board from "/fascist_board.png";

interface GameBoardProps {}

const MAX_CARDS = 6;

const BOARD_RATIO = 3;
const PADDING = 10;

const OUTER_WIDTH = 400;
const OUTER_HEIGHT = OUTER_WIDTH / BOARD_RATIO;
const CARD_WIDTH = OUTER_WIDTH / (MAX_CARDS + 1) - PADDING;
const CARD_HEIGHT = OUTER_HEIGHT;

const FascistGameBoard: React.FC<GameBoardProps> = ({}) => {
  const dispatch = useDispatch();
  const elements = useSelector(
    (state: RootState) => state.facistBoard.elements
  );

  const handleAddElement = () => {
    if (elements.length < MAX_CARDS) {
      dispatch(
        addElement({ path: fascist_policy_card, alt: "Fascist policy card" })
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "none",
          padding: PADDING,
          borderRadius: "5px",
          width: OUTER_WIDTH,
          height: OUTER_HEIGHT,
          marginBottom: PADDING,
          backgroundImage: `url(${fascist_board})`,
          backgroundSize: "cover", // Cover the entire area of the div
          backgroundPosition: "center", // Center the background image
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: OUTER_WIDTH / (MAX_CARDS * 2),
          }}
        >
          {elements.map((element, index) => (
            <div
              key={index}
              style={{
                marginRight: "10px",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                flexShrink: 0,
                display: "flex",
                alignItems: "center", // Center items vertically
                justifyContent: "center", // Center items horizontally
              }}
            >
              <img
                src={element.path}
                alt={element.alt}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleAddElement}
        style={{
          marginLeft: "10px",
          marginTop: "10px",
          visibility: elements.length < MAX_CARDS ? "visible" : "hidden",
        }}
      >
        Add Card
      </button>
    </div>
  );
};

export default FascistGameBoard;
