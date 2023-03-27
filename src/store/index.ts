import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/authSlice";
import menuSlice from "store/menuSlice";
import postsSlice from "store/postsSlice";
import toastSlice from "store/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    menu: menuSlice,
    posts: postsSlice,
    toast: toastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
