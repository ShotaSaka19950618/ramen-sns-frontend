import { createSlice } from "@reduxjs/toolkit";
import type { Post, User } from "types";

export interface PostsState {
  shareOpen: boolean;
  timeline: {
    post: Post;
    user: User;
  }[];
  ranking: {
    _id: string;
    count: number;
  }[];
}

const initialState: PostsState = {
  shareOpen: false,
  timeline: [],
  ranking: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setShareOpen: (state, action) => {
      state.shareOpen = action.payload;
    },
    setTimeline: (state, action) => {
      state.timeline = action.payload;
    },
    setRanking: (state, action) => {
      state.ranking = action.payload;
    },
  },
});

export const { setShareOpen, setTimeline, setRanking } = postsSlice.actions;

export default postsSlice.reducer;
