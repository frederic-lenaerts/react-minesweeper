import { Board } from "../models";

export function getNeighboringCellIndices(cellIndex: number, board: Board) {
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
  