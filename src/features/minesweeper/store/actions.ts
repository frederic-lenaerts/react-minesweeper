import { AppThunk } from '@app/store';
import { createAction } from '@reduxjs/toolkit';

import { CellId } from '../models';
import { getNeighboringCellIndices } from './utils';

export const revealCell = createAction<CellId>("minesweeper/REVEAL_CELL");

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

export const flagCell = createAction<CellId>("minesweeper/FLAG_CELL");

export const unflagCell = createAction<CellId>("minesweeper/UNFLAG_CELL");

export const reset = createAction("minesweeper/RESET");
