import { Request, Response } from "express";
import { Gameplay } from "../models/Gameplay";
import { broadcastMessage } from "../index";

let game: Gameplay | null = null;

const gameCheck = (game: Gameplay): boolean => {
  return game.fascistCards === 6 || game.liberalCards === 5;
};

const createGame = (req: Request, res: Response): void => {
  //this needs to be updated to set player roles at start of game
  game = {
    currentChancellor: "",
    currentPresident: "",
    fascistCards: 0,
    liberalCards: 0,
    liberalPlayers: [],
    fascistPlayers: [],
    hitler: "",
  };

  broadcastMessage({ type: "start_game" });
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
    identity: "fascist" | "hitler" | "liberal";
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

    const shuffledPlayers = shuffle(players);

    return { name: player, role, identity };
  });

  res.json(playerData);
};

const addFascist = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }

  console.log("added fascist");
  game.fascistCards = game.fascistCards + 1;

  const result = gameCheck(game);
  res.json(result);
};

const addLiberal = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  console.log("added liberal");

  game.liberalCards = game.liberalCards + 1;

  const result = gameCheck(game);
  res.json(result);
};

const setChancellor = (req: Request, res: Response): void => {
  const playerString = req.body.player;
  const player = JSON.parse(playerString);

  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }

  let result: boolean;
  if (game.currentChancellor !== player) {
    game.currentChancellor = player;
    result = true;
  } else {
    result = false;
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

  game.currentPresident = player;

  res.json(true);
};

export {
  addFascist,
  addLiberal,
  setChancellor,
  setPresident,
  createGame,
  initializePlayers,
};
