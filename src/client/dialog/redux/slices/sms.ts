/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state

// Define the initial state using that type
const initialState: SmsData.Action = {
  data: {
    all: false,
    offices: [],
    roles: [],
    ninjas: [],
    phones: [],
    message: '',
  },
  /* --- */
  sendable: false,
  sending: false,
  estimate: 0,
};

export const smsSlice = createSlice({
  name: 'sms',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    all: (state, action) => {
      state.data.all = action.payload;
    },
    offices: (state, action) => {
      state.data.offices = action.payload;
    },
    roles: (state, action) => {
      state.data.roles = action.payload;
    },
    ninjas: (state, action) => {
      state.data.ninjas = action.payload;
    },
    phones: (state, action) => {
      state.data.phones = action.payload;
    },
    message: (state, action) => {
      state.data.message = action.payload;
    },
    sendable: (state, action) => {
      state.sendable = action.payload;
    },
    sending: (state, action) => {
      state.sending = action.payload;
    },
    estimate: (state, action) => {
      state.estimate = action.payload;
    },
  },
});

export const {
  all,
  offices,
  roles,
  ninjas,
  phones,
  message,
  sendable,
  estimate,
} = smsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSms = (state: RootState) => state.sms;

export default smsSlice.reducer;
