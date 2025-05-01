// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { authService } from '../../services/authService';  // Importing the service

// // Asynchronous action to call login API using AuthService
// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async ({ email, password }: { email: string; password: string }, thunkAPI) => {
//     try {
//       const data = await authService.login(email, password);
//       return data; // Will be passed as action.payload
//     } catch (error) {
//       // @ts-ignore
//       return thunkAPI.rejectWithValue(error.message); // Handle errors properly
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: { user: null, isLoading: false, error: null } as any,
//   reducers: {
//     logout(state) {
//       state.user = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;
