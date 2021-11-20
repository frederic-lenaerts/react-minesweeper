import classNames from 'classnames';
import { useCallback } from 'react';
import { useAppDispatch } from '@app/store';

import { reset } from '../store';
import { GameBoard } from './GameBoard';
import { divider, gameLayout, gameTheme, headerLayout, resetButton } from './styles.css';

export function Minesweeper() {
  const dispatch = useAppDispatch();

  const resetGame = useCallback(() => dispatch(reset()), [dispatch]);

  // reverse column layout to make the reset button have the final tab index
  return (
    <div className={classNames(gameTheme, gameLayout)}>
      <GameBoard />
      <div className={divider}></div>
      <div className={headerLayout}>
        <h1>Minesweeper</h1>
        <button className={resetButton} onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}
