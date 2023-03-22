import { createSlice } from "@reduxjs/toolkit";
import type { Menu } from "types";

export type MenuState = {
  Open: string;
  List: Menu[];
};

const initialState: MenuState = {
  Open: "ホーム",
  List: [
    {
      iconType: "Home",
      url: "/",
      text: "ホーム",
      active: true,
    },
    {
      iconType: "Notifications",
      url: "/Notifications",
      text: "通知",
      active: false,
    },
    {
      iconType: "Bookmark",
      url: "/bookmark",
      text: "ブックマーク",
      active: false,
    },
    {
      iconType: "Person",
      url: "/profile",
      text: "プロフィール",
      active: false,
    },
    {
      iconType: "Settings",
      url: "/settings",
      text: "設定",
      active: false,
    },
  ],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuOpen: (state, action) => {
      state.Open = action.payload;
    },
    setMenuList: (state, action) => {
      state.List = action.payload;
    },
  },
});

export const { setMenuOpen, setMenuList } = menuSlice.actions;
