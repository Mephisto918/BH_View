import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { loginUser } from "../thunks/authThunk";
// import API from "@/config/api";

// const baseUrl = API.BASE_URL
// const PORT = API.PORT

interface UserState{
  id: string|null|undefined,
  username: string|null|undefined,
  firstname: string|null|undefined,
  lastname: string|null|undefined
  email: string|null|undefined
  role: 'admin'|'owner'|'tenant'|'guest'|null,
  token: null,
  isLoggedIn: boolean
}

const initialState: UserState = {
  id: null,
  username: null,
  firstname: null,
  lastname: null,
  email: null,
  role: null,
  token: null,
  isLoggedIn: false
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<'admin'|'owner'|'tenant'|'guest'>) => {
      state.role = action.payload
      state.isLoggedIn = true
    },
    userData: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.role = action.payload.role
    },
    logout: (state) => {
      // wapa na tima
      state.username = null
      state.firstname = null
      state.lastname = null
      state.role = null
      state.isLoggedIn = false
    }
  }
})

export const { login, logout, userData } = authSlice.actions;
export default authSlice.reducer;
