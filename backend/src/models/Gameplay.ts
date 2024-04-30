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

export class Gameplay {
  currentChancellor: string;
  fascistCards: number;
  liberalCards: number;
  players: Player[];
  hitler: string;
  phase: Phase;
  uneligible: string[];

  constructor(
    currentChancellor: string,
    fascistCards: number,
    liberalCards: number,
    players: Player[],
    hitler: string,
    phase: Phase,
    uneligible: string[],
  ) {
    this.currentChancellor = currentChancellor;
    this.fascistCards = fascistCards;
    this.liberalCards = liberalCards;
    this.players = players;
    this.hitler = hitler;
    this.phase = phase;
    this.uneligible = uneligible
  }
}
