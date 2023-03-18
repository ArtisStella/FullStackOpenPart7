import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const InitializeUser = () => {
  const user = window.localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : "";
};

const userSlice = createSlice({
  name: "user",
  initialState: InitializeUser(),
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    resetUser() {
      return null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const Login = (credentials) => {
  return async (dispatch) => {
    let user = await loginService.login(credentials);
    dispatch(setUser(user));
  };
};

export const Logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(resetUser());
  };
};

export default userSlice.reducer;
