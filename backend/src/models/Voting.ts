import { Player } from "./Player";

/*
  Object containing useful information pertaining to "voting" phase
*/
export interface Voting {
  votingActive: boolean; // true if currently a voting phase
  president: string; // name of current president who made chancellor nomination
  candidate: Player; // player who is nominated for chancellor
  ja_votes: number; // number of tallied 'ja' votes
  nein_votes: number; // number of tallied 'nein' votes
  result: "pass" | "fail" | "ongoing"; // pass if more ja than nein votes, fail if nein >= ja, ongoing if vote is still active
}
