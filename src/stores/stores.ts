import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authApi } from "./auth/auth";
import { tenantsApi } from "./tenants/tenants";
import tenantSlice from "./tenants/tenants";
import ownerSlice, { ownersApi } from "./owners/owners";
import adminSlice, { adminsApi } from "./admin/admin";
import boardingHouseSlice from "./boarding-houses/boarding-houses";
import { boardingHouseApi } from "./boarding-houses/boarding-houses";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    admins: adminSlice,
    [adminsApi.reducerPath]: adminsApi.reducer,
    tenants: tenantSlice,
    [tenantsApi.reducerPath]: tenantsApi.reducer,
    owners: ownerSlice,
    [ownersApi.reducerPath]: ownersApi.reducer,
    boardingHouses: boardingHouseSlice,
    [boardingHouseApi.reducerPath]: boardingHouseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(boardingHouseApi.middleware),
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(adminsApi.middleware)
    .concat(tenantsApi.middleware)
    .concat(ownersApi.middleware)
    .concat(boardingHouseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
