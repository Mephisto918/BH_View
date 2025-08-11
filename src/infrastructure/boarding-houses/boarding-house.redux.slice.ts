import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../common/types/api.types";
import api from "@/app/config/api";
import { BoardingHousesState } from "./boarding-house.types";
import {
  BoardingHouse,
  QueryBoardingHouse,
  QueryBoardingHouseSchema,
  GetBoardingHouse,
  FindOneBoardingHouse,
} from "./boarding-house.schema";
import { CreateBoardingHouse } from "./boarding-house.schema";

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
    getAll: builder.query<
      GetBoardingHouse[],
      Partial<QueryBoardingHouse | void>
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        const parsed = QueryBoardingHouseSchema.safeParse(params);
        if (!parsed.success) {
          console.warn("Invalid query params", parsed.error);
          return boardingHouseApiRoute; // Or handle fallback
        }

        Object.entries(parsed.data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });

        return `${boardingHouseApiRoute}?${queryParams.toString()}`;
      },
      transformResponse: (response: ApiResponseType<GetBoardingHouse[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<FindOneBoardingHouse | null, number>({
      query: (id) => `${boardingHouseApiRoute}/${id}`,
      transformResponse: (response: ApiResponseType<FindOneBoardingHouse[]>) =>
        response.results?.[0] ?? null,
    }),
    // TODO make a dto for one source of truth
    create: builder.mutation<any, CreateBoardingHouse>({
      query: (data) => {
        const formData = new FormData();

        // Text fields
        formData.append("ownerId", String(data.ownerId));
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("description", data.description || "");
        formData.append("availabilityStatus", String(data.availabilityStatus));
        formData.append("amenities", JSON.stringify(data.amenities));
        formData.append("location", JSON.stringify(data.location));

        // ✅ Only use this version (no gallery)
        const roomsWithoutGallery = (data.rooms ?? []).map(
          ({ gallery, ...rest }) => rest
        );
        formData.append("rooms", JSON.stringify(roomsWithoutGallery));

        // 📦 Send per-room gallery files
        data.rooms?.forEach((room, index) => {
          room.gallery?.forEach((file) => {
            formData.append(`roomGallery${index}`, {
              uri: file.uri,
              name: file.name,
              type: file.type,
            } as any);
          });
        });

        // ✅ Thumbnail (1 file)
        if (data.thumbnail?.[0]) {
          const file = data.thumbnail[0];
          formData.append("thumbnail", {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        }

        // ✅ Gallery (multiple)
        data.gallery?.forEach((file) => {
          formData.append("gallery", {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        });

        for (const [key, value] of formData.entries()) {
          if (typeof value === "object" && value.uri) {
            console.log(`${key}: [File] ${value.name} (${value.type})`);
          } else {
            console.log(`${key}:`, value);
          }
        }

        console.log({
          url: boardingHouseApiRoute,
          method: "POST",
          body: formData,
        });

        return {
          url: boardingHouseApiRoute,
          method: "POST",
          body: formData,
        };
        // return {} as any;
      },
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
