import { Player } from "./Player";

export interface Voting {
  votingActive: boolean;
  candidate: Player;
  ja_votes: number;
  nein_votes: number;
  result: "pass" | "fail" | "ongoing";
}
