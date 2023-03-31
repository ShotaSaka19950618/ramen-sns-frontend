import { createSlice } from "@reduxjs/toolkit";
import type { Timeline, Notifications } from "types";

export interface PostsState {
  timeline: Timeline[];
  timelineAll: Timeline[];
  bookmarks: Timeline[];
  notifications: Notifications[];
  ranking: {
    _id: string;
    count: number;
  }[];
}

const initialState: PostsState = {
  timeline: [],
  timelineAll: [],
  bookmarks: [],
  notifications: [],
  ranking: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setTimeline: (state, action) => {
      state.timeline = action.payload;
    },
    setTimelineAll: (state, action) => {
      state.timelineAll = action.payload;
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setRanking: (state, action) => {
      state.ranking = action.payload;
    },
  },
});

export const {
  setTimeline,
  setTimelineAll,
  setBookmarks,
  setNotifications,
  setRanking,
} = postsSlice.actions;

export default postsSlice.reducer;
