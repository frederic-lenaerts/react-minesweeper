import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import minesweeperReducer from '@features/minesweeper/store';

export const store = configureStore({
  reducer: {
    minesweeper: minesweeperReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
