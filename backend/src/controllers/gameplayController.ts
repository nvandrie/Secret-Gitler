import { Request, Response } from "express";
import { Gameplay, Phase } from "../models/Gameplay";
import { Voting } from "../models/Voting";
import { broadcastMessage } from "../index";
import { Player } from "../models/Player";

let game: Gameplay | null = null;

let voting: Voting | null = null;

const createGame = (req: Request, res: Response): void => {
  //this needs to be updated to set player roles at start of game
  game = {
    currentChancellor: "",
    currentPresident: "",
    fascistCards: 0,
    liberalCards: 0,
    players: [],
    hitler: "",
    phase: Phase.DEFAULT,
  };

  broadcastMessage({ type: "start_game" });
  res.json(true);
};

const gameCheck = (game: Gameplay): string => {
  if (game.fascistCards === 6) {
    return "fascist board";
  }
  if (game.liberalCards === 5) {
    return "liberal board";
  }
  if (game.fascistCards >= 3 && game.currentChancellor === game.hitler) {
    return "hitler";
  }
  return "";
};

function shuffle(toShuffle: any[]) {
  for (let i = toShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
  }
  return toShuffle;
}

const initializePlayers = (req: Request, res: Response): void => {
  const playerString = req.body.players;
  const players: string[] = JSON.parse(playerString);

  const shuffledPlayers = shuffle(players);

  // Initialize player data
  const playerData: Player[] = shuffledPlayers.map((player, index) => {
    let role: "president" | "chancellor" | "default" = "default";
    let identity: "fascist" | "hitler" | "liberal" = "liberal";

    if (index === 1) {
      identity = "fascist";
    } else if (index === 2) {
      identity = "hitler";
    }
    return { name: player, role, identity };
  });

  if (game === null) {
    return;
  }
  const afterShuffle = shuffle(playerData);

  game.players = afterShuffle;
  game.players[0].role = "president"

  game.hitler = (
    game.players.find((player) => player.identity === "hitler") as Player
  ).name;
  res.json(game.players);
};

const addFascist = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }

  game.fascistCards = game.fascistCards + 1;

  const result = gameCheck(game);
  if (result !== "") {
    broadcastMessage({ type: "end_game", result: result });
  }
  res.json(result);
};

const addLiberal = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  game.liberalCards = game.liberalCards + 1;

  const result = gameCheck(game);
  if (result !== "") {
    broadcastMessage({ type: "end_game", result: result });
  }
  res.json(result);
};

const setChancellor = (player: Player): void => {
  console.log(player);

  if (game == null) {
    return;
  }

  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].name === player.name) {
      game.players[i].role = "chancellor";
    } else if (game.players[i].role === "chancellor") {
      game.players[i].role = "default";
    }
  }

  broadcastMessage({ type: "update_roles" });
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
      game.players[i].role = "default";
    }
  }

  broadcastMessage({ type: "update_roles" });
  res.json(true);
};

const getPlayers = (req: Request, res: Response): void => {
  if (game == null) {
    return;
  }
  res.json(game.players);
};

const endGame = (req: Request, res: Response): void => {
  game = null;
  res.json(true);
};

const checkGame = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  const result = gameCheck(game);
  if (result !== "") {
    broadcastMessage({ type: "end_game", result: result });
  }
  res.json(result);
};
const startVote = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  game.phase = Phase.VOTING;

  voting = {
    votingActive: true,
    candidate: req.body.player,
    ja_votes: 0,
    nein_votes: 0,
    result: "ongoing",
  };

  broadcastMessage({ type: "start_vote" });
  res.json(game.phase);
};

const tallyVote = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  if (voting == null) {
    res.status(500).json({ error: "Voting is not instantialized" });
    return;
  }
  const vote = req.body.vote;
  if (vote == "ja") {
    voting.ja_votes++;
  }
  if (vote == "nein") {
    voting.nein_votes++;
  }

  broadcastMessage({ type: "tally_vote" });

  if (voting.ja_votes + voting.nein_votes == game.players.length) {
    endVote(voting);
  }
  res.json("")
};
// const endVote = (req: Request, res: Response): void => {};
const endVote = (voting: Voting): void => {
  if (voting.ja_votes > voting.nein_votes) {
    voting.result = "pass";
    setChancellor(voting.candidate);
  } else {
    voting.result = "fail";
  }
  broadcastMessage({ type: "end_vote", result: voting.result });
};

export {
  checkGame,
  addFascist,
  addLiberal,
  setChancellor,
  setPresident,
  createGame,
  initializePlayers,
  getPlayers,
  endGame,
  startVote,
  tallyVote,
  endVote,
};
