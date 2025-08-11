import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/app/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../common/types/api.types";
import { Admin, AdminState } from "./admin.types";

const adminApiRoute = `/api/admins`;
export const adminApi = createApi({
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
      query: () => adminApiRoute,
      transformResponse: (response: ApiResponseType<Admin[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<Admin, number>({
      query: (id) => `${adminApiRoute}/${id}`,
      transformResponse: (response: ApiResponseType<Admin>) =>
        response.results ?? null,
      providesTags: (result, error, id) => [{ type: "Admin", id }],
    }),
    create: builder.mutation<Admin, Partial<Admin>>({
      query: (data) => ({
        url: adminApiRoute,
        method: "POST",
        body: data,
      }),
      //* Optional: invalidates cache for "Admin"
      invalidatesTags: ["Admin"],
    }),
    patch: builder.mutation<Admin, { id: number; data: Partial<Admin> }>({
      query: ({ id, data }) => ({
        url: `${adminApiRoute}/${id}`,
        method: "PATCH",
        body: data,
      }),
      //* Optional: invalidates cache for "Admin"
      invalidatesTags: ["Admin"],
    }),
    delete: builder.mutation<Admin, number>({
      query: (id) => ({
        url: `${adminApiRoute}/${id}`,
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
} = adminApi;

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
