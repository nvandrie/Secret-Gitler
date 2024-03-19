import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageElement {
  path: string;
  alt: string;
}

interface FacistBoardState {
  elements: ImageElement[];
}

const initialState: FacistBoardState = {
  elements: [],
};

const facistBoardSlice = createSlice({
  name: "facistBoard",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<ImageElement>) => {
      state.elements.push(action.payload);
    },
  },
});

export const { addElement } = facistBoardSlice.actions;

export default facistBoardSlice.reducer;
