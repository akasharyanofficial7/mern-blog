import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = true;
      state.error = null;
    },
    signInFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSccess, signInFaliure } = userSlice.actions;

export default userSlice.reducer;
