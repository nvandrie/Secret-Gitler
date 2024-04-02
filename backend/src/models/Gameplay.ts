export class Gameplay {
    currentChancellor: string;
    currentPresident: string;
    fascistCards: number;
    liberalCards: number;
    liberalPlayers: string[];
    fascistPlayers: string[];
    hitler: string;

    constructor(currentChancellor: string, currentPresident: string, fascistCards: number, liberalCards: number, liberalPlayers: string[], fascistPlayers: string[], hitler: string) {
        this.currentChancellor = currentChancellor;
        this.currentPresident = currentPresident;
        this.fascistCards = fascistCards;
        this.liberalCards = liberalCards;
        this.liberalPlayers = liberalPlayers;
        this.fascistPlayers = fascistPlayers;
        this.hitler = hitler;
  }}