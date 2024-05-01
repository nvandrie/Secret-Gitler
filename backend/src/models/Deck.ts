/*
  Deck contains 11 fascist cards and 6 liberal cards.
*/
export class Deck {
  discardCards: string[]; // cards in the discard pile
  remainingCards: string[]; // cards in the draw pile
  drawnCards: string[]; // three cards drawn by president
  allCards: string[]; // contains all cards across all decks

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
