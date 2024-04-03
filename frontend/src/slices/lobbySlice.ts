import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LobbyState {
  variable: string | null;
  players: string[];
}

const initialState: LobbyState = {
  variable: null,
  players: []
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setVariable: (state, action: PayloadAction<string>) => {
      state.variable = action.payload;
    },
    addPlayer: (state, action: PayloadAction<string>) => {
      state.players.push(action.payload);
    }
  }
});

export const { setVariable, addPlayer } = lobbySlice.actions;

export default lobbySlice.reducer;

