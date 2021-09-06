import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import bikesSlice from "./bikes-slice";
import reservesSlice from "./reserves-slice";
import usersSlice from "./users-slice";

const combinedReducer = combineReducers({
  users: usersSlice.reducer,
  bikes: bikesSlice.reducer,
  reserves: reservesSlice.reducer
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: ReturnType<typeof store.getState>, action: AnyAction) => { 
  if (action.type === 'users/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer
});

export default store;