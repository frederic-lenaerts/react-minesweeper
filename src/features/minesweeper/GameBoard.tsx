import classNames from "classnames";
import { useAppSelector } from "@app/hooks";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { GameBoardCell } from "./GameBoardCell";
import { selectCellIds, selectBoardDimensions } from "./minesweeperSlice";
import { gameboardLayout, themeClass, vars } from "./styles.css";

export function GameBoard() {
  const { columns } = useAppSelector(selectBoardDimensions);
  const cellIds = useAppSelector(selectCellIds);

  return (
    <div
      className={classNames(themeClass, gameboardLayout)}
      style={assignInlineVars({ [vars.columnCount]: `${columns}` })}
    >
      {cellIds.map((id) => (
        <GameBoardCell id={id} key={id}></GameBoardCell>
      ))}
    </div>
  );
}
