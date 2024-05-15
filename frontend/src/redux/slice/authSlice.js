import { createSlice } from "@reduxjs/toolkit";

//initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    LogoutAction: (state, action) => {
      state.user = null;
    },
  },
});

//generate actions
export const { loginAction, LogoutAction } = authSlice.actions;

//generate reducers
const authReducer = authSlice.reducer;
export default authReducer;
