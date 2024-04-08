import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
  identity: "fascist" | "hitler" | "liberal";
}

interface Players {
  players: Player[];
}

const initialState: Players = {
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
