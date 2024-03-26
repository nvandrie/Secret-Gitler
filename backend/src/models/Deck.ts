
//11 facist cards and 6 liberal, randomized
export class Deck {
    discardCards: string[];
    remainingCards: string[];

    constructor(discardCards: string[], remainingCards: string[]) {
        this.discardCards = discardCards;
        this.remainingCards = remainingCards;
    }
}
  