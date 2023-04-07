import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  title: string;
  backurl: string;
  share: {
    open: boolean;
    comment: {
      id: string;
      shopname: string;
      desc: string;
      name: string;
      username: string;
      profilePicture: string;
      createdAt: string;
    };
  };
  setting: {
    open: boolean;
  };
}

const initialState: MenuState = {
  title: "ホーム",
  backurl: "",
  share: {
    open: false,
    comment: {
      id: "",
      shopname: "",
      desc: "",
      createdAt: "",
      name: "",
      username: "",
      profilePicture: "",
    },
  },
  setting: {
    open: false,
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBackurl: (state, action) => {
      state.backurl = action.payload;
    },
    setShare: (state, action) => {
      state.share = action.payload;
    },
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },
});

export const { setTitle, setBackurl, setShare, setSetting } = menuSlice.actions;

export default menuSlice.reducer;
