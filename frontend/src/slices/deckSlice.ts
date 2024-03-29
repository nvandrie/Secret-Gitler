import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface DeckState {
  remainingCards: number;
  currentCards: string[];
  discardedCards: number;
}

const initialState: DeckState = {
  remainingCards: 17,
  currentCards: [],
  discardedCards: 0
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
  },
});

export const { setCurrentCards, setRemainingCards, setDiscardedCards } = deckSlice.actions;

export default deckSlice.reducer;
