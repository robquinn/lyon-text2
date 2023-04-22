/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: Messages.Action = {
  preview: { fetching: false, data: [] },
  sent: { fetching: false, id: '', data: [] },
};

export const messagesSlice = createSlice({
  name: 'messages',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    previewData: (state, action) => {
      state.preview.data = action.payload;
    },
    previewFetching: (state, action) => {
      state.preview.fetching = action.payload;
    },
    sentData: (state, action) => {
      state.sent.data = action.payload;
    },
    sentFetching: (state, action) => {
      state.sent.fetching = action.payload;
    },
    sentId: (state, action) => {
      state.sent.id = action.payload;
    },
  },
});

export const { sentId, previewData, sentData } = messagesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;
