//11 fascist cards and 6 liberal, randomized
export class Deck {
  discardCards: string[];
  remainingCards: string[];
  drawnCards: string[];
  allCards: string[];
  topCard: string[];

  constructor(
    discardCards: string[],
    remainingCards: string[],
    drawnCards: string[],
    allCards: string[],
    topCard: string[]
  ) {
    this.discardCards = discardCards;
    this.remainingCards = remainingCards;
    this.drawnCards = drawnCards;
    this.allCards = allCards;
    this.topCard = topCard;
  }
}
