import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  daftarLaporan: [],
  loading: false,
  error: null
};

const laporanSlice = createSlice({
  name: 'laporan',
  initialState,
  reducers: {
    muatLaporanMulai: (state) => {
      state.loading = true;
      state.error = null;
    },
    muatLaporanSukses: (state, action) => {
      state.loading = false;
      state.daftarLaporan = action.payload;
    },
    muatLaporanGagal: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    tambahLaporan: (state, action) => {
      state.daftarLaporan.unshift(action.payload);
    },
    updateLaporan: (state, action) => {
      const index = state.daftarLaporan.findIndex(
        laporan => laporan._id === action.payload._id
      );
      if (index !== -1) {
        state.daftarLaporan[index] = action.payload;
      }
    },
    hapusLaporan: (state, action) => {
      state.daftarLaporan = state.daftarLaporan.filter(
        laporan => laporan._id !== action.payload
      );
    }
  }
});

export const {
  muatLaporanMulai,
  muatLaporanSukses,
  muatLaporanGagal,
  tambahLaporan,
  updateLaporan,
  hapusLaporan
} = laporanSlice.actions;

export default laporanSlice.reducer;

