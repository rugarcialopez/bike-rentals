import { configureStore } from "@reduxjs/toolkit";
import bikesSlice from "./bikes-slice";
import reservesSlice from "./reserves-slice";
import usersSlice from "./users-slice";

const store = configureStore({
  reducer: { 
    users: usersSlice.reducer,
    bikes: bikesSlice.reducer,
    reserves: reservesSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;