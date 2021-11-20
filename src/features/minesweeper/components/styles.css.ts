import { globalVars } from "@app/theme/global.css";
import { createTheme, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

import { CellState } from "../models";

export const [gameTheme, vars] = createTheme({
  columnCount: "9",
  cellSize: "3rem",
  gap: "0.5rem",
});

export const gameLayout = style({
  userSelect: "none",

  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  display: 'flex',
  flexDirection: 'column-reverse',

  padding: calc.divide(vars.cellSize, 2),

  borderRadius: "2rem",
  boxShadow: "48px 48px 96px #bebebe, -48px -48px 96px #fff",
});

export const headerLayout = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const resetButton = style({
  padding: "1rem",
  borderRadius: ".5rem",
  ...globalVars.neumorphism.flat,
  ":focus-visible": {
    ...globalVars.neumorphism.convex,
  },
  ":active": {
    ...globalVars.neumorphism.concave,
  },
});

export const divider = style({
  borderRadius: ".5rem",
  boxShadow: "inset 2px 2px 3px #cbcbcb, inset -2px -2px 3px #fff",
  height: "1rem",
  margin: ".5rem 0 1rem",
});

export const gameboardLayout = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: vars.gap,

  width: calc.add(
    calc.multiply(vars.columnCount, vars.cellSize),
    calc(vars.columnCount).subtract(1).multiply(vars.gap).toString()
  ),
});

export const gameboardCell = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: vars.cellSize,
    height: vars.cellSize,
  },
  variants: {
    state: {
      [CellState.REVEALED]: {},
      [CellState.MINE_REVEALED]: {},
      [CellState.MINE_EXPLODED]: {
        color: globalVars.color.danger,
      },
      [CellState.MINE_CORRECT_FLAGGED]: {
        color: globalVars.color.success,
      },
      [CellState.MINE_INCORRECT_FLAGGED]: {
        color: globalVars.color.danger,
      },
      [CellState.FLAGGED]: {
        borderRadius: "50%",
        ...globalVars.neumorphism.pressed,
        ":focus-visible": {
          ...globalVars.neumorphism.concave,
        },
      },
      [CellState.HIDDEN]: {
        borderRadius: "50%",
        ...globalVars.neumorphism.flat,
        ":focus-visible": {
          ...globalVars.neumorphism.convex,
        },
        ":active": {
          ...globalVars.neumorphism.concave,
        },
      },
    },
    count: {
      0: {
        color: globalVars.color.text,
        opacity: 0.75,
      },
      1: { color: "#1098ad" },
      2: { color: "#4263eb" },
      3: { color: "#7048e8" },
      4: { color: "#ae3ec9" },
      5: { color: "#ae3ec9" },
      6: { color: "#ae3ec9" },
      7: { color: "#ae3ec9" },
      8: { color: "#ae3ec9" },
    },
  },
});

export const iconContainer = style({
  width: calc.divide(vars.cellSize, 2),
  height: calc.divide(vars.cellSize, 2),
});
