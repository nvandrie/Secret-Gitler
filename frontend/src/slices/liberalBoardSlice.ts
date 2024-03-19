import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageElement {
  path: string;
  alt: string;
}

interface LiberalBoardState {
  elements: ImageElement[];
}

const initialState: LiberalBoardState = {
  elements: [],
};

const liberalBoardSlice = createSlice({
  name: 'liberalBoard',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<ImageElement>) => {
      state.elements.push(action.payload);
    },
  },
});

export const { addElement } = liberalBoardSlice.actions;

export default liberalBoardSlice.reducer;
