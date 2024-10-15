import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false
  },
  reducers: {
    // action for the user login 
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      // action for the user logs out 
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
