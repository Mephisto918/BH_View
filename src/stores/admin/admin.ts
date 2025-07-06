import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../types";
import { Admin, AdminState } from "./admin.types";

const adminsApiRoute = `/api/admins`;
export const adminsApi = createApi({
  tagTypes: ["Admin"],
  reducerPath: "adminsApi",
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
    getAll: builder.query<Admin[], void>({
      // TODO: add pagination
      query: () => adminsApiRoute,
      transformResponse: (response: ApiResponseType<Admin[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<Admin, number>({
      query: (id) => `${adminsApiRoute}/${id}`,
      transformResponse: (response: ApiResponseType<Admin>) =>
        response.results ?? null,
      providesTags: (result, error, id) => [{ type: "Admin", id }],
    }),
    create: builder.mutation<Admin, Partial<Admin>>({
      query: (data) => ({
        url: adminsApiRoute,
        method: "POST",
        body: data,
      }),
      //* Optional: invalidates cache for "Admin"
      invalidatesTags: ["Admin"],
    }),
    patch: builder.mutation<Admin, { id: number; data: Partial<Admin> }>({
      query: ({ id, data }) => ({
        url: `${adminsApiRoute}/${id}`,
        method: "PATCH",
        body: data,
      }),
      //* Optional: invalidates cache for "Admin"
      invalidatesTags: ["Admin"],
    }),
    delete: builder.mutation<Admin, number>({
      query: (id) => ({
        url: `${adminsApiRoute}/${id}`,
        method: "DELETE",
      }),
      //* Optional: invalidates cache for "Admin"
      invalidatesTags: ["Admin"],
    }),
  }),
});
export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  usePatchMutation,
  useDeleteMutation,
} = adminsApi;

const initialState: AdminState = {
  selectedUser: null,
  filter: "",
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<Admin>) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
});

export const { selectUser, clearSelectedUser } = adminSlice.actions;
export default adminSlice.reducer;
