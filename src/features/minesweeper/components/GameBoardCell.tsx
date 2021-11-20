import { MouseEvent, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";

import { CellId, CellState } from "../models";
import { flagCell, revealArea, selectCell, selectCellState, unflagCell } from "../store";
import { gameboardCell, iconContainer } from "./styles.css";

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
      return <div className={gameboardCell({ state, count: neigboringMines })}>{neigboringMines}</div>;
    case CellState.MINE_REVEALED:
    case CellState.MINE_EXPLODED:
      return (
        <div className={gameboardCell({ state })}>
          <div className={iconContainer}>
            {faBomb}
          </div>
        </div>
      );
    case CellState.MINE_CORRECT_FLAGGED:
    case CellState.MINE_INCORRECT_FLAGGED:
      return (
        <div className={gameboardCell({ state })}>
          <div className={iconContainer}>
            {faFlag}
          </div>
        </div>
      );
    case CellState.FLAGGED:
      return (
        <button className={gameboardCell({ state })} onClick={unflag} onContextMenu={unflag}>
          <div className={iconContainer}>
            {faFlag}
          </div>
        </button>
      );
    default:
      return <button className={gameboardCell({ state: CellState.HIDDEN })} onClick={reveal} onContextMenu={flag}></button>;
  }
}

const faFlag = <svg xmlns="http://www.w3.org/2000/svg" aria-label="flag" focusable="false" role="img" viewBox="0 0 512 512">
  <path
    fill="currentColor"
    d="M336.174 80c-49.132 0-93.305-32-161.913-32-31.301 0-58.303 6.482-80.721 15.168a48.04 48.04 0 0 0 2.142-20.727C93.067 19.575 74.167 1.594 51.201.104 23.242-1.71 0 20.431 0 48c0 17.764 9.657 33.262 24 41.562V496c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-83.443C109.869 395.28 143.259 384 199.826 384c49.132 0 93.305 32 161.913 32 58.479 0 101.972-22.617 128.548-39.981C503.846 367.161 512 352.051 512 335.855V95.937c0-34.459-35.264-57.768-66.904-44.117C409.193 67.309 371.641 80 336.174 80zM464 336c-21.783 15.412-60.824 32-102.261 32-59.945 0-102.002-32-161.913-32-43.361 0-96.379 9.403-127.826 24V128c21.784-15.412 60.824-32 102.261-32 59.945 0 102.002 32 161.913 32 43.271 0 96.32-17.366 127.826-32v240z"
  />
</svg>

const faBomb = <svg xmlns="http://www.w3.org/2000/svg" aria-label="bomb" focusable="false" role="img" viewBox="0 0 512 512">
  <path
    fill="currentColor"
    d="M440.5 88.5l-52 52L415 167c9.4 9.4 9.4 24.6 0 33.9l-17.4 17.4c11.8 26.1 18.4 55.1 18.4 85.6 0 114.9-93.1 208-208 208S0 418.9 0 304 93.1 96 208 96c30.5 0 59.5 6.6 85.6 18.4L311 97c9.4-9.4 24.6-9.4 33.9 0l26.5 26.5 52-52 17.1 17zM500 60h-24c-6.6 0-12 5.4-12 12s5.4 12 12 12h24c6.6 0 12-5.4 12-12s-5.4-12-12-12zM440 0c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12s12-5.4 12-12V12c0-6.6-5.4-12-12-12zm33.9 55l17-17c4.7-4.7 4.7-12.3 0-17-4.7-4.7-12.3-4.7-17 0l-17 17c-4.7 4.7-4.7 12.3 0 17 4.8 4.7 12.4 4.7 17 0zm-67.8 0c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17zm67.8 34c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17zM112 272c0-35.3 28.7-64 64-64 8.8 0 16-7.2 16-16s-7.2-16-16-16c-52.9 0-96 43.1-96 96 0 8.8 7.2 16 16 16s16-7.2 16-16z"
  />
</svg>
