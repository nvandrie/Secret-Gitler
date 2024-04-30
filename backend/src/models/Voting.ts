import { Player } from "./Player";

export interface Voting {
  votingActive: boolean;
  president: string;
  candidate: Player;
  ja_votes: number;
  nein_votes: number;
  result: "pass" | "fail" | "ongoing";
}
