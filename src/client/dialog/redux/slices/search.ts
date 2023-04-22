/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: Search.Action = {
  preview: '',
  sent: '',
};

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    preview: (state, action) => {
      state.preview = action.payload;
    },
    sent: (state, action) => {
      state.sent = action.payload;
    },
  },
});

export const { preview, sent } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
