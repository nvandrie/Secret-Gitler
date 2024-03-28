import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface VoteState {
  votingActive: boolean;
}

const initialState: VoteState = {
  votingActive: false,
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    // Action to toggle the voting activity
    toggleVotingActivity(state) {
      state.votingActive = !state.votingActive;
    },
    // Action to set voting activity
    setVotingActivity(state, action: PayloadAction<boolean>) {
      state.votingActive = action.payload;
    },
  },
});

export const { toggleVotingActivity, setVotingActivity } = voteSlice.actions;

export default voteSlice.reducer;
