export enum GameState {
  INIT = "init",
  PLAYING = "playing",
  WON = "won",
  LOST = "lost",
}

export interface Board {
  rows: number;
  columns: number;
}

export enum CellState {
  HIDDEN = "hidden",
  REVEALED = "revealed",
  FLAGGED = "flagged",
  MINE_REVEALED = "mine_revealed",
  MINE_EXPLODED = "mine_exploded",
  MINE_CORRECT_FLAGGED = "mine_correct_flagged",
  MINE_INCORRECT_FLAGGED = "mine_incorrect_flagged",
}

export interface Cell {
  id: number;
  flagged: boolean;
  revealed: boolean;
  mine: boolean;
  neigboringMines: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export type CellId = Cell["id"];
