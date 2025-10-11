import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectUser as selectTenant } from "../tenants/tenant.redux.slice";
import { tenantApi } from "../tenants/tenant.redux.api";
import { selectUser as selectOwner } from "../owner/owner.redux.slice";
import { ownerApi } from "../owner/owner.redux.api";
import {
  selectUser as selectAdmin,
  adminApi,
} from "../admin/admin.redux.slice";

import { UserRoleEnum } from "../user/user.types";
import { Admin } from "../admin/admin.types";
import { Tenant } from "../tenants/tenant.types";
import { Owner } from "../owner/owner.types";

//* ?
type Args = { id: number; role: typeof UserRoleEnum[keyof typeof UserRoleEnum] };

export const fetchUserDataThunk = createAsyncThunk<void, Args>(
  "auth/fetchUserDataThunk",
  async ({ id, role }, { dispatch }) => {
    let result;

    if (role === UserRoleEnum.TENANT) {
      result = await dispatch(tenantApi.endpoints.getOne.initiate(id)).unwrap();
      dispatch(selectTenant(result as Tenant));
    } else if (role === UserRoleEnum.OWNER) {
      result = await dispatch(ownerApi.endpoints.getOne.initiate(id)).unwrap();
      dispatch(selectOwner(result as Owner));
    } else if (role === UserRoleEnum.ADMIN) {
      result = await dispatch(adminApi.endpoints.getOne.initiate(id)).unwrap();
      dispatch(selectAdmin(result as Admin));
    } else {
      throw new Error("Invalid role");
    }

    // Optional: logging
    // console.log("Fetched user data:", result);
  }
);
