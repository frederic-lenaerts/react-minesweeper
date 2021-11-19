import { AppThunk, RootState } from "@app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initArray } from "@utils/array";

import { Board, Cell, CellId, CellState, GameState } from "./models";

export interface State {
  state: GameState;
  board: Board;
  ids: CellId[];
  cells: Record<CellId, Cell>;
}

function initState(): State {
  const board = { rows: 9, columns: 9 };
  const cells = initCells(board);

  return {
    state: GameState.INIT,
    board,
    ids: cells.map((cell) => cell.id),
    cells: Object.fromEntries(cells.map((cell) => [cell.id, cell])),
  };
}

export const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState: initState(),
  reducers: {
    revealCell(state, action: PayloadAction<CellId>) {
      const cell = state.cells[action.payload];
      cell.flagged = false;
      cell.revealed = true;

      if (cell.mine) {
        state.state = GameState.LOST;
      }
    },
    flagCell(state, action: PayloadAction<CellId>) {
      const cell = state.cells[action.payload];
      cell.flagged = true;

      const mines = Object.values(state.cells).filter((cell) => cell.mine);
      const flags = Object.values(state.cells).filter((cell) => cell.flagged);
      if (mines.every((mine) => mine.flagged) && mines.length === flags.length) {
        state.state = GameState.WON;
      }
    },
    unflagCell(state, action: PayloadAction<CellId>) {
      const cell = state.cells[action.payload];
      cell.flagged = false;
    },
    reset() {
      return initState();
    },
  },
});

export default minesweeperSlice.reducer;

export const { revealCell, flagCell, unflagCell, reset } = minesweeperSlice.actions;

export const revealArea =
  (id: CellId): AppThunk =>
  (dispatch, getState) => {
    dispatch(revealCell(id));

    const state = getState().minesweeper;
    const cell = state.cells[id];

    if (!cell.mine && cell.neigboringMines === 0) {
      const cellIndex = state.ids.indexOf(id);
      const neigboringCellIndices = getNeighboringCellIndices(cellIndex, state.board);
      for (const neighboringCellIndex of neigboringCellIndices) {
        const neighboringCellId = state.ids[neighboringCellIndex];
        const neighboringCell = state.cells[neighboringCellId];

        if (!neighboringCell.revealed && !neighboringCell.flagged) {
          dispatch(revealArea(neighboringCellId));
        }
      }
    }
  };

export const selectGameState = (state: RootState) => state.minesweeper.state;
export const selectBoardDimensions = (state: RootState) => state.minesweeper.board;
export const selectCellIds = (state: RootState) => state.minesweeper.ids;

export const selectCell = (id: CellId) => (state: RootState) => state.minesweeper.cells[id];
export const selectCellState = (id: CellId) => (state: RootState) => {
  const gameState = selectGameState(state);
  const { flagged, revealed, mine } = selectCell(id)(state);

  if (gameState === GameState.WON || gameState === GameState.LOST) {
    switch (true) {
      case flagged && mine:
        return CellState.MINE_CORRECT_FLAGGED;
      case flagged && !mine:
        return CellState.MINE_INCORRECT_FLAGGED;
      case revealed && mine:
        return CellState.MINE_EXPLODED;
      case mine:
        return CellState.MINE_REVEALED;
      default:
        return CellState.REVEALED;
    }
  }

  switch (true) {
    case revealed && !mine:
      return CellState.REVEALED;
    case flagged:
      return CellState.FLAGGED;
    default:
      return CellState.HIDDEN;
  }
};

function initCells(board: Board): Cell[] {
  const cellCount = board.rows * board.columns;

  const cells = initArray(
    cellCount,
    (index) =>
      <Cell>{
        id: index,
        flagged: false,
        revealed: false,
        mine: false,
        neigboringMines: 0,
      }
  );

  const mineIndices = generateMineIndices(board.columns, cellCount - 1);
  for (const mineIndex of mineIndices) {
    cells[mineIndex].mine = true;

    const neigboringCellIndices = getNeighboringCellIndices(mineIndex, board);
    for (const neighboringCellIndex of neigboringCellIndices) {
      cells[neighboringCellIndex].neigboringMines += 1;
    }
  }

  return cells;
}

function generateMineIndices(count: number, max: number) {
  return initArray<number>(count, (_, array) => {
    let bombIndex: number;
    do {
      bombIndex = Math.floor(Math.random() * max);
    } while (array.includes(bombIndex));
    return bombIndex;
  });
}

function getNeighboringCellIndices(cellIndex: number, board: Board) {
  const cellCount = board.rows * board.columns;

  const topEdge = cellIndex < board.columns;
  const bottomEdge = cellIndex >= cellCount - board.columns;
  const leftEdge = cellIndex % board.columns === 0;
  const rightEdge = cellIndex % board.columns === board.columns - 1;

  return [
    ...(!leftEdge ? [cellIndex - 1] : []), //left
    ...(!rightEdge ? [cellIndex + 1] : []), //right
    ...(!topEdge ? [cellIndex - board.columns] : []), //up
    ...(!topEdge && !leftEdge ? [cellIndex - board.columns - 1] : []), //up-left
    ...(!topEdge && !rightEdge ? [cellIndex - board.columns + 1] : []), //up-right
    ...(!bottomEdge ? [cellIndex + board.columns] : []), //down
    ...(!bottomEdge && !leftEdge ? [cellIndex + board.columns - 1] : []), //down-left
    ...(!bottomEdge && !rightEdge ? [cellIndex + board.columns + 1] : []), //down-right
  ];
}
