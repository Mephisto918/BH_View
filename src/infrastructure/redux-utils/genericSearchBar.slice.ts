import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface SearchState<T> {
  query: string;
  results: T[];
}

const createSearchSlice = <T>(name: string) => {
  const initialState: SearchState<T> = {
    query: "",
    results: [],
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      setResults: (state, action: PayloadAction<T[]>) => {
        state.results = action.payload as unknown as Draft<T>[];
      },
      clear: (state) => {
        state.query = "";
        state.results = [];
      },
    },
  });

  return slice;
};

// Usage for genericSearchBarSlice
export const genericSearchBarSlice = createSearchSlice<{
  id: number;
  name: string;
}>("genericSearchBarSlice");
export const { setQuery, setResults, clear } = genericSearchBarSlice.actions;
export default genericSearchBarSlice.reducer;
