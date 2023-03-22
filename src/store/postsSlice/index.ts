import { createSlice } from "@reduxjs/toolkit";
import type { Post, User } from "types";

export type PostsState = {
  shareOpen: boolean;
  timeline: {
    post: Post;
    user: User;
  }[];
};

const initialState: PostsState = {
  shareOpen: false,
  timeline: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setShareOpen: (state, action) => {
      state.shareOpen = action.payload;
    },
    setTimeline: (state, action) => {
      state.timeline = action.payload;
    },
  },
});

export const { setShareOpen, setTimeline } = postsSlice.actions;
