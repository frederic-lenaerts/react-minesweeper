import { MouseEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store';

import { CellId, CellState } from '../models';
import { flagCell, revealArea, selectCell, selectCellState, unflagCell } from '../store';
import { gameboardCell } from './styles.css';

interface Props {
  id: CellId;
}

export function GameBoardCell({ id }: Props) {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectCellState(id));
  const { neigboringMines } = useAppSelector(selectCell(id));

  const reveal = useCallback(() => dispatch(revealArea(id)), [dispatch, id]);
  const flag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      dispatch(flagCell(id));
    },
    [dispatch, id]
  );
  const unflag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      dispatch(unflagCell(id));
    },
    [dispatch, id]
  );

  switch (state) {
    case CellState.REVEALED:
      return <div className={gameboardCell}>{neigboringMines}</div>;
    case CellState.MINE_REVEALED:
      return <div className={gameboardCell}>x</div>;
      case CellState.MINE_EXPLODED:
        return <div className={gameboardCell}>boom</div>;
    case CellState.MINE_CORRECT_FLAGGED:
      return (
        <div className={gameboardCell}>
          right
        </div>
      );
    case CellState.MINE_INCORRECT_FLAGGED:
      return (
        <div className={gameboardCell}>
          wrong
        </div>
      );
    case CellState.FLAGGED:
      return (
        <div className={gameboardCell} onContextMenu={unflag}>
          flagged
        </div>
      );
    default:
      //CellState.HIDDEN
      return <div className={gameboardCell} onClick={reveal} onContextMenu={flag}></div>;
  }
}
