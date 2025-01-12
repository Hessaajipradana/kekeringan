import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import laporanReducer from './slices/laporanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    laporan: laporanReducer
  }
});

