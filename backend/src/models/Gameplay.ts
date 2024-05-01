interface Player {
  name: string;
  role: "president" | "chancellor" | "default";
  identity: "fascist" | "hitler" | "liberal";
}

// add new phases to this enum
export enum Phase {
  VOTING = "voting",
  DEFAULT = "",
}

/*
  Object containing all useful game state information
*/
export class Gameplay {
  currentChancellor: string; // name of player who is currently chancellor
  fascistCards: number; // number of fascist cards played on the fascist board
  liberalCards: number; // number of liberal cards played on the liberal board
  players: Player[]; // list of all players in the lobby
  hitler: string; // name of player who is Hitler
  phase: Phase; // phase of the game (currently "voting" or default)
  uneligible: string[]; // list of players who are uneligible to be nominated as chancellor during a given turn

  constructor(
    currentChancellor: string,
    fascistCards: number,
    liberalCards: number,
    players: Player[],
    hitler: string,
    phase: Phase,
    uneligible: string[]
  ) {
    this.currentChancellor = currentChancellor;
    this.fascistCards = fascistCards;
    this.liberalCards = liberalCards;
    this.players = players;
    this.hitler = hitler;
    this.phase = phase;
    this.uneligible = uneligible;
  }
}
