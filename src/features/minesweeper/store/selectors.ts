import { RootState } from '@app/store';
import { createSelector } from '@reduxjs/toolkit';

import { CellId, CellState, GameState } from '../models';

const selectSelf = (root: RootState) => root.minesweeper;

export const selectGameState = (root: RootState) => selectSelf(root).state;

export const selectBoardDimensions = (root: RootState) => selectSelf(root).board;

export const selectCellIds = (root: RootState) => selectSelf(root).ids;

export const selectCell = (id: CellId) => (root: RootState) => selectSelf(root).cells[id];

export const selectCellState = (id: CellId) =>
  createSelector(selectGameState, selectCell(id), (gameState, cell) => {
    const { flagged, revealed, mine } = cell;

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
  });
