import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackerState {
  failedElections: number;
}

const initialState: TrackerState = {
  failedElections: 0,
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    setFailedElections(state, action: PayloadAction<number>) {
      state.failedElections = action.payload;
    },
  },
});

export const { setFailedElections } = trackerSlice.actions;

export default trackerSlice.reducer;
