import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Owner } from "./owner.types";

//* -- Initial State ---
const initialState: OwnerState = {
  selectedUser: null,
  filter: "",
  loading: false,
  error: null,
};

export interface OwnerState {
  selectedUser: Owner | null;
  filter: string | null;
  loading: boolean;
  error: string | null;
}

//* -- Slice --
const ownerSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<Owner>) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
});

export const { selectUser, clearSelectedUser } = ownerSlice.actions;

export default ownerSlice.reducer;
