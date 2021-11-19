import { initArray } from '@app/utils/array';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { Board, Cell, CellId, GameState } from '../models';
import * as actions from './actions';
import { getNeighboringCellIndices } from './utils';

export interface State {
  state: GameState;
  board: Board;
  ids: CellId[];
  cells: Record<CellId, Cell>;
}

export default createReducer<State>(initState(), {
  [actions.revealCell.type]: (state, action: PayloadAction<CellId>) => {
    const cell = state.cells[action.payload];
    cell.flagged = false;
    cell.revealed = true;

    if (cell.mine) {
      state.state = GameState.LOST;
    }
  },
  [actions.flagCell.type]: (state, action: PayloadAction<CellId>) => {
    const cell = state.cells[action.payload];
    cell.flagged = true;

    const mines = Object.values(state.cells).filter((cell) => cell.mine);
    const flags = Object.values(state.cells).filter((cell) => cell.flagged);
    if (mines.every((mine) => mine.flagged) && mines.length === flags.length) {
      state.state = GameState.WON;
    }
  },
  [actions.unflagCell.type]: (state, action: PayloadAction<CellId>) => {
    const cell = state.cells[action.payload];
    cell.flagged = false;
  },
  [actions.reset.type]: () => initState(),
});

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
