import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  columnCount: '9',
  cellSize: '2rem',
  gap: '0.25rem'
});

export const gameboardLayout = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: vars.gap,
  
  padding: vars.gap,
  width: `calc((${vars.columnCount} * ${vars.cellSize}) + (${vars.gap} * (${vars.columnCount} - 1)))`,

  backgroundColor: 'blue',
});

export const gameboardCell = style({
  flex: `1 0 calc((100% - ((${vars.columnCount} - 1) * ${vars.gap})) / ${vars.columnCount})`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: vars.cellSize,
  height: vars.cellSize,

  borderRadius: '0.25em',
  backgroundColor: 'lightBlue',

  userSelect: 'none',
});