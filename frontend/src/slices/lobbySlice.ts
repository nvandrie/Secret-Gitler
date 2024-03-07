import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LobbyState {
  variable: string | null;
}

const initialState: LobbyState = {
  variable: null
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setVariable: (state, action: PayloadAction<string>) => {
      state.variable = action.payload;
    }
  }
});

export const { setVariable } = lobbySlice.actions;

export default lobbySlice.reducer;

