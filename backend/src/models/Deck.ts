//11 fascist cards and 6 liberal, randomized
export class Deck {
  discardCards: string[];
  remainingCards: string[];
  drawnCards: string[];
  allCards: string[];

  constructor(
    discardCards: string[],
    remainingCards: string[],
    drawnCards: string[],
    allCards: string[]
  ) {
    this.discardCards = discardCards;
    this.remainingCards = remainingCards;
    this.drawnCards = drawnCards;
    this.allCards = allCards;
  }
}
