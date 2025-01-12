import { createSlice } from "@reduxjs/toolkit";

// Bersihkan localStorage jika ada data tidak valid
if (localStorage.getItem("pengguna") === "undefined") {
  localStorage.removeItem("pengguna");
}
if (localStorage.getItem("token") === "undefined") {
  localStorage.removeItem("token");
}

const initialState = {
  pengguna: localStorage.getItem("pengguna")
    ? JSON.parse(localStorage.getItem("pengguna"))
    : null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginMulai: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSukses: (state, action) => {
      state.loading = false;
      state.pengguna = action.payload.pengguna;
      state.token = action.payload.token;
      localStorage.setItem("pengguna", JSON.stringify(action.payload.pengguna));
      localStorage.setItem("token", action.payload.token);
    },
    loginGagal: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.pengguna = null;
      state.token = null;
      localStorage.removeItem("pengguna");
      localStorage.removeItem("token");
    },
  },
});

export const { loginMulai, loginSukses, loginGagal, logout } =
  authSlice.actions;
export default authSlice.reducer;
