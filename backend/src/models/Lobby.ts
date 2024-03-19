// This is the lobby interface that defines what a lobby "object" is

// id: the lobby ID players can use to join
// players: an array list of player games
export interface Lobby {
  id: string;
  players: string[];
}
