import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectUser as selectTenant,
  tenantsApi,
} from "../tenants/tenants";
import {
  selectUser as selectOwner,
  ownersApi,
} from "../owners/owners";
import {
  selectUser as selectAdmin,
  adminsApi,
} from "../admin/admin";

import { UserRole } from "../types/user.types";
import { Admin } from "../admin/admin.types";
import { Tenant } from "../tenants/tenants.types";
import { Owner } from "../owners/owners.types";

type Args = { id: number; role: UserRole };

export const fetchUserDataThunk = createAsyncThunk<void, Args>(
  "auth/fetchUserDataThunk",
  async ({ id, role }, { dispatch }) => {
    let result;

    if (role === UserRole.TENANT) {
      result = await dispatch(tenantsApi.endpoints.getOne.initiate(id)).unwrap();
      dispatch(selectTenant(result as Tenant));
    } else if (role === UserRole.OWNER) {
      result = await dispatch(ownersApi.endpoints.getOne.initiate(id)).unwrap();
      dispatch(selectOwner(result as Owner));
    } else if (role === UserRole.ADMIN) {
      result = await dispatch(adminsApi.endpoints.getOne.initiate(id)).unwrap();
      dispatch(selectAdmin(result as Admin));
    } else {
      throw new Error("Invalid role");
    }

    // Optional: logging
    // console.log("Fetched user data:", result);
  }
);
