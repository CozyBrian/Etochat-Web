import { configureStore } from "@reduxjs/toolkit";
import userState from "./user-slice";
import callState from "./call-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const action = {
  user: userState.actions,
  call: callState.actions,
};

const store = configureStore({
  reducer: {
    user: userState.reducer,
    call: callState.reducer,
  },
});

export default store;
