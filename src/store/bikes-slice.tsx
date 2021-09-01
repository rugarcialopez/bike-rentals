import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Bike from "../models/Bike";

const API_URL = process.env.REACT_APP_BIKES_API_URL || 'http://localhost:4000/api';

type BikesState = {
  error: string,
  list: Bike[],
  status: string,
  name: string
}

const initialState: BikesState = {
  error: '',
  list: [],
  status: '',
  name: ''
}

const bikesSlice = createSlice({
  name: 'bikes',
  initialState: initialState,
  reducers: {
    bikesRequest(state: BikesState, action: PayloadAction<{ name: string }>) {
      state.error = '';
      state.status = 'pending';
      state.name = action.payload.name;
    },
    setBikes(state: BikesState, action: PayloadAction<{ bikes: Bike[]}>) {
      state.list = action.payload.bikes;
      state.status = 'completed';
    },
    addNewBike(state: BikesState, action: PayloadAction<Bike>) {
      state.list.push(action.payload);
      state.status = 'completed';
    },
    updateExistingBike(state: BikesState, action: PayloadAction<Bike>) {
      const {
        payload: { id, colors, weight, location, photo, availableForRenting }
      } = action;
      state.list = state.list.map((bike: Bike) => 
        bike.id === id ? {...bike, colors, weight, location, photo, availableForRenting } : bike
      );
      state.status = 'completed';
    },
    deleteExistingBike(state: BikesState, action: PayloadAction<{ id: string}>) {
      state.list = state.list.filter((bike: Bike) => bike.id !== action.payload.id);
      state.status = 'completed';
    },
    bikesFail(state: BikesState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = 'completed';
    }
  }
});

const bikesActions = bikesSlice.actions;

export const { setBikes, addNewBike, updateExistingBike, deleteExistingBike } = bikesActions;

export const fetchBikes = (token:  string) => {
  return async (dispatch: Dispatch) => {
    dispatch(bikesActions.bikesRequest({ name: ' LIST' }));
    try {
      const response = await fetch(`${API_URL}/bikes`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        bikes: Bike[],
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { bikes } = responseData;
      dispatch(bikesActions.setBikes({ bikes }));
    } catch (error) {
      dispatch(bikesActions.bikesFail(error.message))
    }
  }
}

export const addBike = (token:  string, formData: FormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(bikesActions.bikesRequest({ name: 'ADD' }));
    try {
      const response = await fetch(`${API_URL}/add-bike`, {
        method: 'POST',
        body: formData,
        headers: {
          'token': token
        }
      });
      const responseData: {
        bike: Bike,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        bike
      } = responseData;
      dispatch(bikesActions.addNewBike(bike));
    } catch (error) {
      dispatch(bikesActions.bikesFail(error.message))
    }
  }
}

export const updateBike =(token:  string, id: string, brand: string, colors: string[], weight: string, latitude: string, longitude: string, availableForRenting: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch(bikesActions.bikesRequest({ name: 'UPDATE' }));
    try {
      const body = {
        brand,
        color: colors.join(','),
        weight: parseInt(weight),
        latitude,
        longitude,
        availableForRenting
      };
      
      const response = await fetch(`${API_URL}/update-bike/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        bike: Bike,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        bike
      } = responseData;
      dispatch(bikesActions.updateExistingBike(bike));
    } catch (error) {
      dispatch(bikesActions.bikesFail(error.message))
    }
  }
}

export const deleteBike = (token:  string, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(bikesActions.bikesRequest({ name: 'DELETE' }));
    try {
      const response = await fetch(`${API_URL}/delete-bike/${id}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        bike: Bike,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        bike
      } = responseData;
      dispatch(bikesActions.deleteExistingBike({ id: bike.id }));
    } catch (error) {
      dispatch(bikesActions.bikesFail(error.message))
    }
  }
}



export default bikesSlice;