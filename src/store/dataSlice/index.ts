import { createSlice } from "@reduxjs/toolkit";
import type { Timeline, Notifications } from "types";

export interface DataState {
  reacquisition: number;
  timeline: Timeline[];
  timelineAll: Timeline[];
  bookmarks: Timeline[];
  notifications: Notifications[];
  ranking: {
    rank: number;
    shopname: string;
    count: number;
  }[];
}

const initialState: DataState = {
  reacquisition: 0,
  timeline: [],
  timelineAll: [],
  bookmarks: [],
  notifications: [],
  ranking: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setReacquisition: (state, action) => {
      state.reacquisition = action.payload;
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
  setReacquisition,
  setTimeline,
  setTimelineAll,
  setBookmarks,
  setNotifications,
  setRanking,
} = dataSlice.actions;

export default dataSlice.reducer;
