import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'

//Redux store for the 'configureStore' function
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});