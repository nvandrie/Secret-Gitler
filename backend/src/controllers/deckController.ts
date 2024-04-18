import { Request, Response } from "express";
import { Deck } from "../models/Deck";
import { broadcastMessage } from "../index";

let deck: Deck | null = null;

function shuffleDeck(toShuffle: string[]) {
  for (let i = toShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
  }
  return toShuffle;
}

const newDeck = (req: Request, res: Response): void => {
  const numFascist = 11;
  const numLiberal = 6;

  const fascistCards = Array(numFascist).fill("fascist");
  const liberalCards = Array(numLiberal).fill("liberal");
  const initialDeck = [...fascistCards, ...liberalCards];

  const remainingCards = shuffleDeck(initialDeck);

  deck = {
    discardCards: [],
    remainingCards,
    drawnCards: [],
    allCards: remainingCards,
  };

  res.json(deck);
};

const drawCards = (req: Request, res: Response): void => {
  if (!deck) {
    res.status(404).json({ message: "Deck not found" });
    return;
  }

  if (deck.remainingCards.length >= 3) {
    deck.drawnCards = deck.remainingCards.slice(0, 3);
    deck.remainingCards = deck.remainingCards.slice(3);
  } else {
    const left = deck.remainingCards.length;
    const newDeck = shuffleDeck(deck.discardCards);
    const cardsToAdd = newDeck
      .splice(0, 3 - left)
      .concat(deck.remainingCards.splice(0, left));
    deck.drawnCards = cardsToAdd;
    deck.remainingCards = newDeck;
    deck.discardCards = [];
  }
  deck.discardCards.push(...deck.drawnCards);
  broadcastMessage({ type: "draw_cards" });

  res.json(deck);
};

const removeCard = (req: Request, res: Response): void => {
  const drawnCardsString = req.body.cardToRemove;
  const cardToRemove = JSON.parse(drawnCardsString);

  if (!deck) {
    res.status(404).json({ message: "Deck not found" });
    return;
  }
  //remove card that has been played from deck
  deck.allCards.splice(deck.allCards.indexOf(cardToRemove), 1);
  deck.discardCards.splice(deck.discardCards.indexOf(cardToRemove), 1);

  broadcastMessage({ type: "card_click", card: cardToRemove });

  res.json(deck);
};

const getCard = (req: Request, res: Response): void => {
  res.json(deck);
};

const getTopCard = (req: Request, res: Response): void => {
  if (!deck) {
    res.status(404).json({ message: "Deck not found" });
    return;
  }

  let topCard = deck.remainingCards.slice(0, 1);
  deck.remainingCards = deck.remainingCards.slice(1);


  broadcastMessage({ type: "tracker_play_card", card: topCard });
  res.json({
    deck: deck,
    topCard: topCard,
  });
};

const clearDeck = (req: Request, res: Response): void => {
  deck = null
  res.json(true);
};

const startSelect = (req: Request, res: Response): void => {
  const drawnCardsString = req.body.selectedCards;
  const selectedCard = JSON.parse(drawnCardsString);

  broadcastMessage({ type: "select_cards", cards: selectedCard });
  res.json(true);
};


export { drawCards, newDeck, clearDeck, removeCard, getCard, startSelect, getTopCard };
