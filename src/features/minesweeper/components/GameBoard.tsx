import classNames from 'classnames';
import { useAppSelector } from '@app/store';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { selectBoardDimensions, selectCellIds } from '../store';
import { GameBoardCell } from './GameBoardCell';
import { gameboardLayout, vars } from './styles.css';

export function GameBoard() {
  const { columns } = useAppSelector(selectBoardDimensions);
  const cellIds = useAppSelector(selectCellIds);

  return (
    <div
      className={gameboardLayout}
      style={assignInlineVars({ [vars.columnCount]: `${columns}` })}
    >
      {cellIds.map((id) => (
        <GameBoardCell id={id} key={id}></GameBoardCell>
      ))}
    </div>
  );
}
