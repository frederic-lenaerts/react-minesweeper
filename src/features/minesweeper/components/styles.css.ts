import { createTheme, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const [gameboardTheme, vars] = createTheme({
  columnCount: '9',
  cellSize: '3rem',
  gap: '0.25rem'
});

export const gameboardLayout = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: vars.gap,

  padding: calc(vars.cellSize).divide(2).toString(),
  width: `calc((${vars.columnCount} * ${vars.cellSize}) + (${vars.gap} * (${vars.columnCount} - 1)))`,

  borderRadius: '50px',
  background: 'linear-gradient(145deg, #cacaca, #f0f0f0)',
  boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
});

export const gameboardCell = style({
  flex: `1 0 calc((100% - ((${vars.columnCount} - 1) * ${vars.gap})) / ${vars.columnCount})`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: vars.cellSize,
  height: vars.cellSize,
  fontSize: '1rem',

  borderRadius: '50px',
  background: 'linear-gradient(145deg, #cacaca, #f0f0f0)',
  boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  fontWeight: 500,
  fontFamily: 'Arial',

  userSelect: 'none',
});

export const iconContainer = style({
  width: calc(vars.cellSize).divide(2).toString(),
  height: calc(vars.cellSize).divide(2).toString(),
})