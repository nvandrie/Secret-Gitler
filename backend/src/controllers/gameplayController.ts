import { Request, Response } from "express";
import { Gameplay } from "../models/Gameplay";

let game: Gameplay | null = null;

const gameCheck = (game: Gameplay): boolean => {
    return (game.fascistCards === 6) || (game.liberalCards === 5);
}

const createGame = (req: Request, res: Response): void => {
    //this needs to be updated to set player roles at start of game
    game = {
        currentChancellor: "",
        currentPresident: "",
        fascistCards: 0,
        liberalCards: 0,
        liberalPlayers: [],
        fascistPlayers: [],
        hitler: ""
    };

    res.json(true);
};


const addFascist = (req: Request, res: Response): void => {
    if (game == null) {
        res.status(500).json({ error: "Game is not initialized" });
        return;
    }

    game.fascistCards = game.fascistCards + 1;

    const result = gameCheck(game)
    res.json(result);
};

const addLiberal = (req: Request, res: Response): void => {
    if (game == null) {
        res.status(500).json({ error: "Game is not initialized" });
        return;
    }

    game.liberalCards = game.liberalCards + 1;

    const result = gameCheck(game)
    res.json(result);
};

const setChancellor = (req: Request, res: Response): void => {
    const playerString = req.body.player;
    const player = JSON.parse(playerString);

    if (game == null) {
        res.status(500).json({ error: "Game is not initialized" });
        return;
    }

    let result: boolean
    if (game.currentChancellor !== player){
        game.currentChancellor = player
        result = true
    } else {
        result = false
    }

    res.json(result);
};

const setPresident = (req: Request, res: Response): void => {
    const playerString = req.body.player;
    const player = JSON.parse(playerString);

    if (game == null) {
        res.status(500).json({ error: "Game is not initialized" });
        return;
    }

    game.currentPresident = player

    res.json(true);
};


export { addFascist, addLiberal, setChancellor, setPresident, createGame }
