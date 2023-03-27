import { createSlice } from "@reduxjs/toolkit";

export interface ToastState {
  state: {
    open: boolean;
    type: "" | "success" | "error";
    message: string;
  };
}

const initialState: ToastState = {
  state: {
    open: false,
    type: "",
    message: "",
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
