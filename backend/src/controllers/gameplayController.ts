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
  game.players[0].role = "president";
  game.currentPresident = game.players[0].name;

  game.hitler = (
    game.players.find((player) => player.identity === "hitler") as Player
  ).name;

  broadcastMessage({ type: "start_game" });

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
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }

  let presidentIndex = -1;

  // Find the index of the current president, if any
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].role === "president") {
      presidentIndex = i;
      break;
    }
  }

  // Determine the index of the next player to become president
  const nextPresidentIndex = (presidentIndex + 1) % game.players.length;

  // Reset roles for all players
  for (let i = 0; i < game.players.length; i++) {
    if (i === nextPresidentIndex) {
      game.players[i].role = "president";
      game.currentPresident = game.players[i].name;
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
    president: game.currentPresident,
    candidate: req.body.player,
    ja_votes: 0,
    nein_votes: 0,
    result: "ongoing",
  };

  console.log(voting);

  broadcastMessage({
    type: "start_vote",
    president: voting.president,
    candidate: voting.candidate.name,
  });
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
  let color = "white"
  const vote = req.body.vote;
  if (vote == "ja") {
    voting.ja_votes++;
    color = "green"
  }
  if (vote == "nein") {
    voting.nein_votes++;
    color = "red"
  }

  broadcastMessage({ type: "tally_vote", player: req.body.player, color: color });

  if (voting.ja_votes + voting.nein_votes == game.players.length) {
    endVote(voting);
  }
  res.json("");
};

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
