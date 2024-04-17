import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface DeckState {
  remainingCards: number;
  currentCards: string[];
  discardedCards: number;
  canDraw: boolean
}

const initialState: DeckState = {
  remainingCards: 17,
  currentCards: [],
  discardedCards: 0,
  canDraw: false

};

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    setCurrentCards(state, action: PayloadAction<string[]>) {
      state.currentCards = action.payload;
    },
    setRemainingCards(state, action: PayloadAction<number>) {
        state.remainingCards = action.payload;
      },
    setDiscardedCards(state, action: PayloadAction<number>) {
        state.discardedCards = action.payload;
      },
      setDraw(state, action: PayloadAction<boolean>) {
        state.canDraw = action.payload;
      }
  },
});

export const { setCurrentCards, setRemainingCards, setDiscardedCards, setDraw } = deckSlice.actions;

export default deckSlice.reducer;
