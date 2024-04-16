export interface Voting {
  votingActive: boolean;
  ya_votes: number;
  nein_votes: number;
  result: "pass" | "fail" | "ongoing";
}
