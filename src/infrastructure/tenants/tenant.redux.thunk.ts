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