import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.data;
      state.loading = false;
      toast.success("Logged in!");
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      toast.error(action.payload);
    },

    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      toast.success("Logged out!");
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      toast.error(action.payload);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
