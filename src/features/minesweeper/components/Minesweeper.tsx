import classNames from 'classnames';

import { GameBoard } from './GameBoard';
import { Header } from './Header';
import { divider, gameLayout, gameTheme } from './styles.css';

export function Minesweeper() {
  return (
    <div className={classNames(gameLayout, gameTheme)}>
      <Header />
      <div className={divider}></div>
      <GameBoard />
    </div>
  );
}
