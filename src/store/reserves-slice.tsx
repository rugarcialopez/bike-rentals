import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Reserve from "../models/Reserve";

const API_URL = process.env.REACT_APP_BIKES_API_URL || 'http://localhost:4000/api';

type ReserveState = {
  error: string,
  list: Reserve[],
  status: string,
  name: string
}

const initialState: ReserveState = {
  error: '',
  list: [],
  status: '',
  name: ''
}

const reservesSlice = createSlice({
  name: 'reserves',
  initialState: initialState,
  reducers: {
    reserveRequest(state: ReserveState, action: PayloadAction<{ name: string }>) {
      state.error = '';
      state.status = 'pending';
      state.name = action.payload.name;
    },
    setReserves(state: ReserveState, action: PayloadAction<{ reserves: Reserve[]}>) {
      state.list = action.payload.reserves;
      state.status = 'completed';
    },
    addNewReserve(state: ReserveState, action: PayloadAction<Reserve>) {
      state.list.push(action.payload);
      state.status = 'completed';
    },
    reservesFail(state: ReserveState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = 'completed';
    }
  }
});

const reserveActions = reservesSlice.actions;

export const fetchReserves = (token:  string) => {
  return async (dispatch: Dispatch) => {
    dispatch(reserveActions.reserveRequest({ name: ' LIST' }));
    try {
      const response = await fetch(`${API_URL}/reserves`, {
        method: 'GET',
        headers: {
          'token': token
        }
      });
      const responseData: {
        reserves: Reserve[],
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { reserves } = responseData;
      dispatch(reserveActions.setReserves({ reserves }));
    } catch (error) {
      dispatch(reserveActions.reservesFail(error.message))
    }
  }
}

export const addReserve = (token:  string, userId: string, bikeId: string, date: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(reserveActions.reserveRequest({ name: 'ADD' }));
    try {
      const response = await fetch(`${API_URL}/reserves`, {
        method: 'POST',
        body: JSON.stringify({ userId, bikeId, date }),
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        reserve: Reserve,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        reserve
      } = responseData;
      dispatch(reserveActions.addNewReserve(reserve));
    } catch (error) {
      dispatch(reserveActions.reservesFail(error.message))
    }
  }
}

export default reservesSlice;