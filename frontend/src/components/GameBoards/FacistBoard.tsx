import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.ts';
import { addElement } from "../../slices/facistBoardSlice.ts";

interface GameBoardProps {
  outerStyle?: React.CSSProperties; // Style for the outer container
  cardStyle?: React.CSSProperties; // Style for the individual cards
}

const MAX_CARDS = 5; // Maximum number of cards allowed
const CARD_WIDTH = 100; // Width of each card in pixels
const CARD_HEIGHT = 80; // Height of each card in pixels
const OUTER_WIDTH = 550; // Width of the outer rectangle in pixels
const OUTER_HEIGHT = 100; // Height of the outer rectangle in pixels

const FacistBoard: React.FC<GameBoardProps> = ({ outerStyle, cardStyle }) => {
  const dispatch = useDispatch();
  const elements = useSelector((state: RootState) => state.facistBoard.elements);

  const handleAddElement = () => {
    if (elements.length < MAX_CARDS) {
      // Example: add a random string as the element
      // would most likely have image adding here
      const randomString = Math.random().toString(36).substring(4);
      dispatch(addElement(randomString));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px', width: OUTER_WIDTH, height: OUTER_HEIGHT, marginBottom: '20px', ...outerStyle }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {elements.map((element, index) => (
            <div key={index} style={{ marginRight: '10px', marginBottom: '10px', width: CARD_WIDTH, height: CARD_HEIGHT, flexShrink: 0, ...cardStyle }}>
              <div style={{ border: '1px solid black', padding: '5px', borderRadius: '5px', height: '100%' }}>Card {element}</div>
            </div>
          ))}
        </div>
      </div>
      {elements.length < MAX_CARDS && (
        <button onClick={handleAddElement} style={{ marginLeft: '10px', marginTop: '10px' }}>Add Card</button>
      )}
    </div>
  );
};

export default FacistBoard;
