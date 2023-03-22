import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { menuSlice, MenuState } from "store/menuSlice";
import { postsSlice, PostsState } from "store/postsSlice";
import { authSlice, AuthState } from "store/authSlice";

export type AppState = {
  menu: MenuState;
  posts: PostsState;
  auth: AuthState;
};

const rootReducer = combineReducers<AppState>({
  menu: menuSlice.reducer,
  posts: postsSlice.reducer,
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
