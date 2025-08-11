import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/app/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../common/types/api.types";
import { Owner, OwnerState } from "./owner.types";

//* -- Initial State ---
const initialState: OwnerState = {
  selectedUser: null,
  filter: "",
  loading: false,
  error: null,
};

//* -- RTK ---
const ownerApiRoute = `/api/owners`;
export const ownerApi = createApi({
  tagTypes: ["Owner"],
  reducerPath: "ownersApi",
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
    getAll: builder.query<Owner[], void>({
      // TODO: add pagination
      query: () => ownerApiRoute,
      transformResponse: (response: ApiResponseType<Owner[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<Owner, number>({
      query: (id) => `${ownerApiRoute}/${id}`,
      transformResponse: (response: ApiResponseType<Owner>) =>
        response.results ?? null,
      //* Optional: invalidates cache for `Owner`
      providesTags: (result, error, id) => [{ type: "Owner", id }],
    }),
    create: builder.mutation<Owner, Partial<Owner>>({
      query: (data) => {
        const trans = {
          ...data,
          age: data.age !== undefined ? Number(data.age) : undefined,
        };
        return {
          url: ownerApiRoute,
          method: "POST",
          body: trans,
        };
      },
      //* Optional: invalidates cache for `Owner`
      invalidatesTags: ["Owner"],
    }),
    patch: builder.mutation<Owner, { id: number; data: Partial<Owner> }>({
      query: ({ id, data }) => ({
        url: `${ownerApiRoute}/${id}`,
        method: "PATCH",
        body: data,
      }),
      //* Optional: invalidates cache for `Owner`
      invalidatesTags: ["Owner"],
    }),
    delete: builder.mutation<Owner, number>({
      query: (id) => ({
        url: `${ownerApiRoute}/${id}`,
        method: "DELETE",
      }),
      //* Optional: invalidates cache for `Owner`
      invalidatesTags: ["Owner"],
    }),
  }),
});
export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  usePatchMutation,
  useDeleteMutation,
} = ownerApi;

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
