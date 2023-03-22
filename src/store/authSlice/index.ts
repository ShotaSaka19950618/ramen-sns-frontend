import { createSlice } from "@reduxjs/toolkit";
import type { User } from "types";

export type AuthState = {
  authUser: User | null;
  token: string;
  isLoading: boolean;
  isSigninLoading: boolean;
};

const initialState: AuthState = {
  authUser: null,
  token: "",
  isLoading: false,
  isSigninLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsSigninLoading: (state, action) => {
      state.isSigninLoading = action.payload;
    },
  },
});

export const { setAuthUser, setToken, setIsLoading, setIsSigninLoading } =
  authSlice.actions;
