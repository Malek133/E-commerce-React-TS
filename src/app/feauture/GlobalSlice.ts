import { createSlice } from "@reduxjs/toolkit";

// Define the initial state type
interface GlobalState {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}

// Define the initial state
const initialState: GlobalState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    onOpenCartDrawerAction: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    }
  }
});

export const { onCloseCartDrawerAction, onOpenCartDrawerAction } = globalSlice.actions;

// Selector with proper typing
export const selectGlobal = (state: 
    { global: GlobalState }): GlobalState => state.global;

export default globalSlice.reducer;
