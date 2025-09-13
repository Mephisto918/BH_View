import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BoardingHousesState } from "./boarding-house.types";
import { BoardingHouse } from "./boarding-house.schema-improved";
//* -- Initial State --
const initialState: BoardingHousesState = {
  boardingHouses: [],
  selectedBoardingHouse: null,
  isLoading: false,
  error: null,
};

//* -- Thunks --
//* this is a side effect, you can call it like a function
//* possible for image upload and image search
//* possible for location json parsing from using PostGIS

//* -- Slice --
const boardingHouseSlice = createSlice({
  name: "boardingHouses",
  initialState,
  reducers: {
    selectBoardinHouse(state, action: PayloadAction<BoardingHouse>) {
      state.selectedBoardingHouse = action.payload;
    },
    clearSelectedBoardingHouse(state) {
      state.selectedBoardingHouse = null;
    },
  },
});

//* --- Selectors ---
export const { selectBoardinHouse, clearSelectedBoardingHouse } =
  boardingHouseSlice.actions;

//* --- Exoport reducer ---
export default boardingHouseSlice.reducer;

// TODO: add a usage documentation
