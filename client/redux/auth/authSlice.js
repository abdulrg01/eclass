import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null, isOpen: false },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state) => {
      state.token = null;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setCredentials, logOut, setUser, setIsOpen } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

export const selectCurrentUser = (state) => state.auth.user;
