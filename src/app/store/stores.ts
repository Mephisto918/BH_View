import { configureStore } from "@reduxjs/toolkit";
import boardingHouseSlice from "@/infrastructure/boarding-houses/boarding-house.redux.slice";
import { boardingHouseApi } from "@/infrastructure/boarding-houses/boarding-house.redux.slice";
import authSlice, { authApi } from "@/infrastructure/auth/auth.redux.slice";
import adminSlice, { adminApi } from "@/infrastructure/admin/admin.redux.slice";
import ownerSlice, { ownerApi } from "@/infrastructure/owner/owner.redux.slice";
import tenantSlice, { tenantApi } from "@/infrastructure/tenants/tenant.redux.slice";
// import authSlice from '../../infrastructure/auth/auth';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    admins: adminSlice,
    [adminApi.reducerPath]: adminApi.reducer,
    tenants: tenantSlice,
    [tenantApi.reducerPath]: tenantApi.reducer,
    owners: ownerSlice,
    [ownerApi.reducerPath]: ownerApi.reducer,
    boardingHouses: boardingHouseSlice,
    [boardingHouseApi.reducerPath]: boardingHouseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(boardingHouseApi.middleware),
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminApi.middleware)
      .concat(tenantApi.middleware)
      .concat(ownerApi.middleware)
      .concat(boardingHouseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
