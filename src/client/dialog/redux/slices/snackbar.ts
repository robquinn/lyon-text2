/* eslint-disable no-param-reassign,@typescript-eslint/no-unsafe-member-access */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: Snackbar.Action = {
  open: false,
  severity: 'info',
  title: 'Info',
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    snackbar: (state, action) => {
      state.open = action.payload.open;
      state.severity = action.payload.severity;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
  },
});

export const { snackbar } = snackbarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSnackbar = (state: RootState) => state.snackbar;

export default snackbarSlice.reducer;
