interface Player {
    name: string;
    role: "president" | "chancellor" | "default";
    identity: "fascist" | "hitler" | "liberal"
}

export class Gameplay {
    currentChancellor: string;
    currentPresident: string;
    fascistCards: number;
    liberalCards: number;
    players: Player[]
    hitler: string;

    constructor(currentChancellor: string, currentPresident: string, fascistCards: number, liberalCards: number, players: Player[], hitler: string) {
        this.currentChancellor = currentChancellor;
        this.currentPresident = currentPresident;
        this.fascistCards = fascistCards;
        this.liberalCards = liberalCards;
        this.players = players;
        this.hitler = hitler;
  }}