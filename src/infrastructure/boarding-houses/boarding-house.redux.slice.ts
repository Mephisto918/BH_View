import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../types/api.types";
import api from "@/app/config/api";
import { BoardingHouse, BoardingHousesState } from "./boarding-house.types";
import { FindBoardingHouseDto } from "./dto/FindBoardingHouse.dto";

//* -- Initial State --
const initialState: BoardingHousesState = {
  boardingHouses: [],
  selectedBoardingHouse: null,
  isLoading: false,
  error: null,
};

//* -- createApi --
const boardingHouseApiRoute = `/api/boarding-houses`;
export const boardingHouseApi = createApi({
  tagTypes: ["BoardingHouse"],
  reducerPath: "boardingHouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
    // skips the fetchFn that logs, for debugging only
    //  fetchFn: async (input, init) => {
    //   console.log("FETCHING URL:", input);
    //   console.log("FETCH INIT:", init);
    //   return fetch(input, init);
    // },
  }),
  endpoints: (builder) => ({
    getAll: builder.query<BoardingHouse[], Partial<FindBoardingHouseDto>>({
      query: (paramas) => {
        const queryParamas = new URLSearchParams();

        Object.entries(paramas || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParamas.append(
              key,
              value instanceof Date ? value.toISOString() : String(value)
            );
          }
        });

        return `${boardingHouseApiRoute}?${queryParamas.toString()}`;
      },
      transformResponse: (response: ApiResponseType<BoardingHouse[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<BoardingHouse, number>({
      query: (id) => `${boardingHouseApiRoute}/${id}`,
    }),
    create: builder.mutation<BoardingHouse, Partial<BoardingHouse>>({
      query: (data) => ({
        url: boardingHouseApiRoute,
        method: "POST",
        body: data,
      }),
      //* Optional: invalidates cacche for "BoardingHouse"
      invalidatesTags: ["BoardingHouse"],
    }),
    delete: builder.mutation<BoardingHouse, number>({
      query: (id) => ({
        url: `${boardingHouseApiRoute}/${id}`,
        method: "DELETE",
      }),
      //* Optional: invalidates cache for "BoardingHouse"
      invalidatesTags: ["BoardingHouse"],
    }),
  }),
});
export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  useDeleteMutation,
} = boardingHouseApi;

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
