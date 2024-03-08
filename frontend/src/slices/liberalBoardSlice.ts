// gameBoardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  elements: string[];
}

const initialState: GameState = {
  elements: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<string>) => {
      state.elements.push(action.payload);
    },
  },
});

export const { addElement } = gameSlice.actions;

export default gameSlice.reducer;
