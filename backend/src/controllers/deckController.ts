import { Request, Response } from "express";
import { Deck } from "../models/Deck";

let deck: Deck | null = null;

const newDeck = (req: Request, res: Response): void => {
    const numFascist = 11;
    const numLiberal = 6;
  
    const fascistCards = Array(numFascist).fill("facist");
    const liberalCards = Array(numLiberal).fill("liberal");
    const initialDeck = [...fascistCards, ...liberalCards];

    for (let i = initialDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialDeck[i], initialDeck[j]] = [initialDeck[j], initialDeck[i]];
      }

    const remainingCards = initialDeck;
  
    deck = {
      discardCards: [],
      remainingCards,
    };
    
    res.json(deck);  
};

const updateDeck = (req: Request, res: Response): void => {
    const { discardCards } = req.body;
  
    if (!deck) {
        res.status(404).json({ message: "Deck not found" });
        return;
    }

    deck.remainingCards = deck.remainingCards.slice(3)
    deck.discardCards.push(...discardCards);

    if (deck.remainingCards.length < 3) {
        newDeck(req, res);
        return;
    }
  
    res.json(deck);
};

export { newDeck, updateDeck };
