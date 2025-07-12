import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../types";
import { Tenant, TenantState } from "./tenants.types";

//* createApi
//* For accessing the API with built-in abstractions
//* such as isLoading, error, and others.
const tenantsApiRoute = `/api/tenants`;
export const tenantsApi = createApi({
  tagTypes: ["Tenant"],
  reducerPath: "tenantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
    fetchFn: async (input, init) => {
      console.log("FETCHING URL:", input);
      console.log("FETCH INIT:", init);
      return fetch(input, init);
    },
  }),

  endpoints: (builder) => ({
    getAll: builder.query<Tenant[], void>({
      // TODO: add pagination
      query: () => tenantsApiRoute,
      transformResponse: (response: ApiResponseType<Tenant[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<Tenant, number>({
      query: (id) => `${tenantsApiRoute}/${id}`,
      transformResponse: (response: ApiResponseType<Tenant>) =>
        response.results ?? null,
      //* Optional: invalidates cache for "Tenant"
      providesTags: (result, error, id) => [{ type: "Tenant", id }],
    }),
    create: builder.mutation<Tenant, Partial<Tenant>>({
      query: (data) => {
        const trans = {
          ...data,
          age: data.age !== undefined ? Number(data.age) : undefined,
        };
        return {
          url: tenantsApiRoute,
          method: "POST",
          body: trans,
        };
      },
      //* Optional: invalidates cache for "Tenant"
      invalidatesTags: ["Tenant"],
    }),
    patch: builder.mutation<Tenant, { id: number; data: Partial<Tenant> }>({
      query: ({ id, data }) => ({
        url: `${tenantsApiRoute}/${id}`,
        method: "PATCH",
        body: data,
      }),
      //* Optional: invalidates cache for "Tenant"
      invalidatesTags: ["Tenant"],
    }),
    delete: builder.mutation<Tenant, number>({
      query: (id) => ({
        url: `${tenantsApiRoute}/${id}`,
        method: "DELETE",
      }),
      //* Optional: invalidates cache for "Tenant"
      invalidatesTags: ["Tenant"],
    }),
  }),
});
// Export hooks for usage in functional components
export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  usePatchMutation,
  useDeleteMutation,
} = tenantsApi;

// * -- createApi Usage --
/*
 * // Fetch all tenants
 * const { data: tenants, isLoading, error } = useGetAllQuery();
 *
 * // Fetch a tenant by ID
 * const { data: tenant, isLoading: isTenantLoading, error: tenantError } = useGetOneQuery(id);
 *
 * // Create a tenant
 * const [createTenant, { isLoading: isCreating, error: createError }] = useCreateMutation();
 * // createTenant({ username: "john", ... });
 *
 * // Delete a tenant
 * const [deleteTenant, { isLoading: isDeleting, error: deleteError }] = useDeleteMutation();
 * // deleteTenant(id);
 */

//* -- Thunks --
//* this is a side effect, you can call it like a function
//* has no plan to use it for now
// export const fetchTenantsThunk = createAsyncThunk(
//   "tenants/fetchAll",
//   async () => {

//     const response = await tenantsApi.endpoints.getAll.initiate();

//     return response.results ?? [];
//   }
// );

//* -- Initial State --
const initialState: TenantState = {
  selectedUser: null,
  filter: "",
  loading: false,
  error: null,
};

//* -- Slice --
//* are the object state, in here you can redcuers that acts like actions
const tenantSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<Tenant>) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    // TODO: Add Filter
  },

  //* NOTE: Currently not using thunk (fetchTenantsThunk) for async fetching.
  //* This is left here as reference for future use when handling side effects
  //* such as API calls with preprocessing logic or orchestrated requests.
  //extraReducers: (builder) => {
  /*
   *builder
   *  .addCase(fetchTenantsThunk.pending, (state) => {
   *    state.loading = true;
   *    state.error = null;
   *  })
   *  .addCase(fetchTenantsThunk.fulfilled, (state, action) => {
   *    state.loading = false;
   *    state.tenants = action.payload;
   *  })
   *  .addCase(fetchTenantsThunk.rejected, (state, action) => {
   *    state.loading = false;
   *    state.error = action.error.message || "Failed to fetch tenants";
   *  });
   */
  //},
});

//* --- Selectors ---
export const { selectUser, clearSelectedUser } = tenantSlice.actions;

//* --- Export reducer ---
export default tenantSlice.reducer;

// * Usage *
/*
 * Inside your React Component file....
 *
 * import { useSelector, useDispatch } from "react-redux";
 * import { useGetAllQuery } from "@/stores/tenants/tenants";
 * // adjust depending on the path
 *
 * import type { RootState } from "@/stores"
 * // assuming you have a RootState type exported from your store setup
 *
 *
 * // inside the function of the component
 * const dispatch = useDispatch();
 *
 * // Get tenants and selectedTenant from the slice state
 * const {data: tenants, isLoading, isError} = useGetAllQuery();
 * 
 * // then `tenants` contains the array of tenants
 * 
 * 
 * // TIP!
 * // use this to preload the data and do caching
 * // dispatch(tenantsApi.endpoints.getAll.initiate());
 * 
 * // TIP!
 * // use `const { refetch } = useGetAllQuery();` to manually refetch the data
 * // refetch();

 */
