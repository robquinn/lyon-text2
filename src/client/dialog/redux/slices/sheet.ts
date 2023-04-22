/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface SheetData {
  offices: OfficesWrapper.Offices;
  roles: RolesWrapper.Roles;
  ninjas: NinjasWrapper.Ninjas;
}
// Define the initial state using that type
const initialState: SheetData = {
  offices: [],
  roles: [],
  ninjas: [],
};

export const sheetSlice = createSlice({
  name: 'sheet',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    offices: (state, action) => {
      state.offices = action.payload;
    },
    roles: (state, action) => {
      state.roles = action.payload;
    },
    ninjas: (state, action) => {
      state.ninjas = action.payload;
    },
  },
});

export const { offices, roles, ninjas } = sheetSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSheet = (state: RootState) => state.sheet;

export default sheetSlice.reducer;
