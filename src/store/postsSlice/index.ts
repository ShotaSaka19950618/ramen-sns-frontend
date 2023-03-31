import { createSlice } from "@reduxjs/toolkit";
import type { Timeline, Notifications } from "types";

export interface PostsState {
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
    setShare: (state, action) => {
      state.share = action.payload;
    },
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
  setShare,
  setTimeline,
  setTimelineAll,
  setBookmarks,
  setNotifications,
  setRanking,
} = postsSlice.actions;

export default postsSlice.reducer;
