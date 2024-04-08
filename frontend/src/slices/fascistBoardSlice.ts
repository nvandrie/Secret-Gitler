import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageElement {
  path: string;
  alt: string;
}

interface FascistBoardState {
  elements: ImageElement[];
}

const initialState: FascistBoardState = {
  elements: [],
};

const fascistBoardSlice = createSlice({
  name: "fascistBoard",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<ImageElement>) => {
      state.elements.push(action.payload);
    },
  },
});

export const { addElement } = fascistBoardSlice.actions;

export default fascistBoardSlice.reducer;
