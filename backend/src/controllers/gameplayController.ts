import { Request, Response } from "express";
import { Gameplay } from "../models/Gameplay";
import { broadcastMessage } from "../index"


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
        players: [],
        hitler: ""
    };

    broadcastMessage({ type: 'start_game' });
    res.json(true);
};

function shuffle(toShuffle: string[]) {
    for (let i = toShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
    }
    return toShuffle;
}

const initializePlayers = (req: Request, res: Response): void => {
    interface Player {
        name: string;
        role: "president" | "chancellor" | "default";
        identity: "fascist" | "hitler" | "liberal"
    }

    const playerString = req.body.players;
    const players: string[] = JSON.parse(playerString);

    const shuffledPlayers = shuffle(players);

    // Initialize player data
    const playerData: Player[] = shuffledPlayers.map((player, index) => {
        let role: "president" | "chancellor" | "default" = "default";
        let identity: "fascist" | "hitler" | "liberal" = "liberal";

        // Assign roles and identities based on index
        if (index === 0) {
            role = "president";
        }

        if (index === 3) {
            identity = "fascist";
        } else if (index === 4) {
            identity = "hitler";
        }

        return { name: player, role, identity };
    });

    if (game === null){
        return;
    }

    game.players = playerData

    res.json(playerData);
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
    const player = req.body.player;
    console.log(player)

    if (game == null) {
        res.status(500).json({ error: "Game is not initialized" });
        return;
    }

    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].name === player) {
            game.players[i].role = "chancellor";
        } else if (game.players[i].role === "chancellor"){
            game.players[i].role = "default"
        }
    }

    broadcastMessage({ type: 'update_roles' });

    res.json(true);
};

const setPresident = (req: Request, res: Response): void => {
    const player = req.body.player;

    if (game == null) {
        res.status(500).json({ error: "Game is not initialized" });
        return;
    }

    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].name === player) {
            game.players[i].role = "president";
        } else {
            game.players[i].role = "default"
        }
    }

    broadcastMessage({ type: 'update_roles' });


    res.json(true);
};

const getPlayers = (req: Request, res: Response): void => {
    if (game == null) {
        return;
    }
    res.json(game.players);
};

const endGame = (req: Request, res: Response): void => {
    game = null
    res.json(true);
};



export { addFascist, addLiberal, setChancellor, setPresident, createGame, initializePlayers, getPlayers, endGame }
