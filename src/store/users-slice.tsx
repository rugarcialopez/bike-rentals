import { createSlice, Dispatch } from "@reduxjs/toolkit";
import User from "../models/User";

const API_URL = process.env.REACT_APP_BIKES_API_URL || 'http://localhost:4000/api';

type UsersState = {
  error: string,
  list: User[],
  status: string,
  name: string
}

const initialState: UsersState = {
  error: '',
  list: [],
  status: '',
  name: ''
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersRequest(state: UsersState, action) {
      state.error = '';
      state.status = 'pending';
      state.name = action.payload
    },
    usersReceive(state: UsersState, action) {
      state.list = action.payload;
      state.status = 'completed';
    },
    usersFail(state: UsersState, action) {
      state.error = action.payload;
      state.status = 'completed';
    }
  }
});

const usersActions = usersSlice.actions;

export const fetchUsers = (token:  string) => {
  return async (dispatch: Dispatch) => {
    dispatch(usersActions.usersRequest('LIST'));
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      dispatch(usersActions.usersReceive(responseData.users));
    } catch (error) {
      dispatch(usersActions.usersFail(error))
    }
  }
}

export const addUser = (token:  string, firstName: string, lastName: string, email: string, password: string, role: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(usersActions.usersRequest('ADD'));
    try {
      const response = await fetch(`${API_URL}/add-user`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, role }),
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      dispatch(usersActions.usersReceive(responseData.users));
    } catch (error) {
      dispatch(usersActions.usersFail(error))
    }
  }
}

export const updateUser = (token:  string, id: string, firstName: string, lastName: string, email: string, role: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(usersActions.usersRequest('UPDATE'));
    try {
      const response = await fetch(`${API_URL}/update-user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, email, role }),
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      dispatch(usersActions.usersReceive(responseData.users));
    } catch (error) {
      dispatch(usersActions.usersFail(error))
    }
  }
}

export const deleteUser = (token:  string, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(usersActions.usersRequest('DELETE'));
    try {
      const response = await fetch(`${API_URL}/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      dispatch(usersActions.usersReceive(responseData.users));
    } catch (error) {
      dispatch(usersActions.usersFail(error))
    }
  }
}



export default usersSlice;
