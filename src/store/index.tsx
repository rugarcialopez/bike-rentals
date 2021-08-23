import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users-slice";

const store = configureStore({
  reducer: { users: usersSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;