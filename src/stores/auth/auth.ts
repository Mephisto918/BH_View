import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../types";
import { AuthState, AuthUser, LoginResults } from "./auth.types";
import { UserRole } from "../types/user.types";

const initialState: AuthState = {
  userData: {
    id: null,
    username: "guest",
    email: "",
    role: UserRole.GUEST,
    isActive: false,
    isVerified: false,
  },
  token: null,
};

//* Usage
/*
 * const onLogin = async () => {
 * const { results } = await login(credentials).unwrap();
 *   dispatch(setAuth({ token: results.access_token, user: results.user }));
 * };
 *
 * // then anywhere
 * const user = useSelector((state: RootState) => state.auth.user);
 * if (user?.isVerified) {
 *   // show badge
 * }
 */

//* createApi
//* For accessing the API with built-in abstractions
//* such as isLoading, error, and others.
const authApiRoute = `/api/auth`;
export const authApi = createApi({
  tagTypes: ["Auth"],
  reducerPath: "authApi",
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
    login: builder.mutation<LoginResults, Partial<AuthUser>>({
      query: (data) => ({
        url: `${authApiRoute}/login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponseType<LoginResults>) =>
        response.results ?? [],
    }),
    // TODO: expand here later and should meet with backend interface
  }),
});
//* Export hooks for usage in funcitonal components
export const { useLoginMutation } = authApi;

//* -- Thunks --
//* this is a side effect, you can call it like a function
//* has no plan to use it for now
//* validateTokenThunk is a great candidate here -> checks token validity with Dispatch logout() or refreshToken() if needed

//* -- Slice --
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      // * normalize role casing
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// * Combined Usage * in simple login
/*
 * import { useDispatch } from "react-redux";
 * import { login, logout } from "@/stores/auth/auth";
 * import { useLoginMutation } from "@/stores/auth/auth";
 *
 * // inside your component
 * const [triggerLogin, { isLoading, error }] = useLoginMutation();
 * const dispatch = useDispatch();
 *
 * const handleLogin = async (credentials) => {
 *   try {
 *     const { access_token, user } = await triggerLogin(credentials).unwrap();
 *     dispatch(login({
 *       token: access_token,
 *       userData: user
 *     }));
 *   } catch (err) {
 *     console.error("Login failed:", err);
 *   }
 * };
 */
