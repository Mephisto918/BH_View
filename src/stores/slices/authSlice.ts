import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
  user: {
    firstname: string|null,
    lastname: string|null
  }|null,
  email: string|null|undefined,
  role: 'admin'|'ownser'|'tenant'|null,
  token: null,
  isLoggedIn: boolean
}

const initialState: UserState = {
  user: {
    firstname: null,
    lastname: null,
  },
  email: null,
  role: null,
  token: null,
  isLoggedIn: false
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<'admin'|'ownser'|'tenant'>) => {
      state.role = action.payload
      state.isLoggedIn = true
    },
    userData: (state, action: PayloadAction<{username: string, firstname : string, lastname : string, email?: string|null|undefined}>) => {
      state.user = {
        firstname : action.payload.firstname,
        lastname : action.payload.lastname
      };
      state.email = action.payload.email;
    },
    logout: (state) => {
      // wapa na tima
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;
    }
  }
})

export const { login, logout, userData } = authSlice.actions;
export default authSlice.reducer;
