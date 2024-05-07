import { Request, Response } from "express";
import { Gameplay, Phase } from "../models/Gameplay";
import { Voting } from "../models/Voting";
import { broadcastMessage } from "../index";
import { Player } from "../models/Player";

let game: Gameplay | null = null;
let voting: Voting | null = null;

//creates game by initalizing game object
const createGame = (req: Request, res: Response): void => {
  game = {
    currentChancellor: "",
    fascistCards: 0,
    liberalCards: 0,
    players: [],
    hitler: "",
    phase: Phase.DEFAULT,
    uneligible: [],
  };

  res.json(true);
};

//helper function to determine if gameplay has concluded based on game win conditions
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

//simple helper function to shuffle players array
function shuffle(toShuffle: any[]) {
  for (let i = toShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
  }
  return toShuffle;
}

//initalizes players with a game lobby size of 6
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
  //shuffles players again so hitler isn't initialized in same position
  const afterShuffle = shuffle(playerData);

  game.players = afterShuffle;
  game.players[0].role = "president";

  //sets initial president to be uneligible to be chancellor
  game.uneligible = [game.players[0].name, "", ""];

  game.hitler = (
    game.players.find((player) => player.identity === "hitler") as Player
  ).name;

  broadcastMessage({ type: "start_game" });

  res.json(game.players);
};

//adds facist cards to board and updates state
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

//adds liberal cards to board and updates state
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

//helper function to set chancellor once vote has concluded
const setChancellor = (player: Player): void => {
  if (game == null) {
    return;
  }
  game.currentChancellor = player.name;

  //this sets previous president to be eligible for next round
  game.uneligible[2] = "";

  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].name === player.name) {
      game.players[i].role = "chancellor";
    } else if (game.players[i].role === "chancellor") {
      game.players[i].role = "default";
    }
  }

  broadcastMessage({ type: "update_roles", uneligible: game.uneligible });
};

//updates president upon completetion of turn
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
      //past president is uneligible
      game.uneligible[2] = game.players[i].name;
      break;
    }
  }

  // Determine the index of the next player to become president
  const nextPresidentIndex = (presidentIndex + 1) % game.players.length;

  // Reset roles for all players
  for (let i = 0; i < game.players.length; i++) {
    if (i === nextPresidentIndex) {
      game.players[i].role = "president";

      //current president is uneligible
      game.uneligible[0] = game.players[i].name;
    } else {
      game.players[i].role = "default";
    }
  }

  broadcastMessage({ type: "update_roles", uneligible: game.uneligible });
  res.json(true);
};

//return players array
const getPlayers = (req: Request, res: Response): void => {
  if (game == null) {
    res.json("fail");
    return
  }
  res.json(game.players);
};

//returns uneligible players
const getUneligible = (req: Request, res: Response): void => {
  if (game == null) {
    return;
  }
  res.json(game.uneligible);
};

//resets game state on conclusion of game
const endGame = (req: Request, res: Response): void => {
  game = null;
  res.json(true);
};

//initalizes the checking of the game win conditions and returns result
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

/*
  Initiates a voting phase and broadcasts "voting" object
*/
const startVote = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  game.phase = Phase.VOTING;

  let presidentIndex = -1;
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].role === "president") {
      presidentIndex = i;
      break;
    }
  }

  voting = {
    votingActive: true,
    president: game.players[presidentIndex].name,
    candidate: req.body.player,
    ja_votes: 0,
    nein_votes: 0,
    result: "ongoing",
  };

  //previous canidate is uneligible
  game.uneligible[1] = req.body.player.name;

  broadcastMessage({
    type: "start_vote",
    president: voting.president,
    candidate: voting.candidate.name,
  });
  res.json(game.phase);
};

/*
  Tallies a vote received from a client and stores it to voting state
*/
const tallyVote = (req: Request, res: Response): void => {
  if (game == null) {
    res.status(500).json({ error: "Game is not initialized" });
    return;
  }
  if (voting == null) {
    res.status(500).json({ error: "Voting is not instantialized" });
    return;
  }
  let color = "white";
  const vote = req.body.vote;

  // increment 'ja' counter and set player's background color to green
  if (vote == "ja") {
    voting.ja_votes++;
    color = "green";
  }

  // increment 'nein' counter and set player's background color to red
  if (vote == "nein") {
    voting.nein_votes++;
    color = "red";
  }

  broadcastMessage({
    type: "tally_vote",
    player: req.body.player,
    color: color,
  });

  if (voting.ja_votes + voting.nein_votes == game.players.length) {
    endVote(voting);
  }
  res.json("");
};

/*
  Ends voting phase. Receives a voting object as a parameter. If voting passes, set the elected chancellor and broadcast the result.
*/
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
  getUneligible,
};
