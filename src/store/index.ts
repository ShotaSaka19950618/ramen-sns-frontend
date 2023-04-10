import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/authSlice";
import menuSlice from "store/menuSlice";
import dataSlice from "store/dataSlice";
import toastSlice from "store/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    menu: menuSlice,
    data: dataSlice,
    toast: toastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
