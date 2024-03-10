import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addElement } from "../../slices/facistBoardSlice";
import fascist_policy_card from "/fascist_policy.png";

interface GameBoardProps {
  outerStyle?: React.CSSProperties; // Style for the outer container
  cardStyle?: React.CSSProperties; // Style for the individual cards
}

const MAX_CARDS = 5;
const CARD_WIDTH = 70;
const CARD_HEIGHT = 98;
const OUTER_WIDTH = (CARD_WIDTH + 10) * MAX_CARDS;
const OUTER_HEIGHT = 100;

const FascistGameBoard: React.FC<GameBoardProps> = ({
  outerStyle,
  cardStyle,
}) => {
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
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          borderRadius: "5px",
          width: OUTER_WIDTH,
          height: OUTER_HEIGHT,
          marginBottom: "10px",
          ...outerStyle,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {elements.map((element, index) => (
            <div
              key={index}
              style={{
                marginRight: "10px",
                marginBottom: "10px",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                flexShrink: 0,
                display: "flex",
                alignItems: "center", // Center items vertically
                justifyContent: "center", // Center items horizontally
                ...cardStyle,
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
