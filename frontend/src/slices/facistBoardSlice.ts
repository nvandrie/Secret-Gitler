import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FacistBoardState {
  elements: string[];
}

const initialState: FacistBoardState = {
  elements: [],
};

const facistBoardSlice = createSlice({
  name: 'facistBoard',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<string>) => {
      state.elements.push(action.payload);
    },
  },
});

export const { addElement } = facistBoardSlice.actions;

export default facistBoardSlice.reducer;
