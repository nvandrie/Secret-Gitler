import React, { useEffect, useState } from 'react';
import '../../styling/Gameplay.css';
import axiosInstance from '../../api/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store"
import { setCurrentCards, setDiscardedCards, setRemainingCards } from '../../slices/deckSlice';

const Deck: React.FC = () => {
  const dispatch = useDispatch();
  const remainingCards = useSelector((state: RootState) => state.deck.remainingCards);
  const discardedCards = useSelector((state: RootState) => state.deck.discardedCards);

    useEffect(() => {
        const createNewDeck = async () => {
            try {
                await axiosInstance.post('/api/new-deck');
                dispatch(setRemainingCards(17));
                dispatch(setDiscardedCards(0));
            } catch (error) {
                console.error('Error creating new deck:', error);
            }
        };
        createNewDeck();
    }, []);

    const handleDeckClick = async () => {
      const response = await axiosInstance.post("/api/draw-cards");
      const drawnCards = response.data.drawnCards
      dispatch(setCurrentCards(drawnCards));
      dispatch(setRemainingCards(response.data.remainingCards.length));
      dispatch(setDiscardedCards(response.data.discardCards.length - 3))
    };

    return (
        <div className="container">
            <div className="deck">
                <h3 className="deck-text">Draw</h3>
                <div className="rectangle" onClick={handleDeckClick}>
                    <div className="inner-rectangle">
                      <p className="cards-count">{remainingCards}</p>
                    </div>
                </div>
            </div>
            <div className="deck">
                <h3 className="deck-text">Discard</h3>
                <div className="rectangle">
                    <div className="inner-rectangle">
                      <p className="cards-count">{discardedCards}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deck;
