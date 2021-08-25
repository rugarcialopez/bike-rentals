import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
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
    usersRequest(state: UsersState, action: PayloadAction<{ name: string }>) {
      state.error = '';
      state.status = 'pending';
      state.name = action.payload.name;
    },
    setUsers(state: UsersState, action: PayloadAction<{ users: User[]}>) {
      state.list = action.payload.users;
      state.status = 'completed';
    },
    addNewUser(state: UsersState, action: PayloadAction<User>) {
      state.list.push(action.payload);
      state.status = 'completed';
    },
    updateExistingUser(state: UsersState, action: PayloadAction<User>) {
      const {
        payload: { id, firstName, lastName, email, role }
      } = action;
      state.list = state.list.map((user: User) => 
        user.id === id ? {...user, firstName, lastName, email, role } : user
      );
      state.status = 'completed';
    },
    deleteExistingUser(state: UsersState, action: PayloadAction<{ id: string}>) {
      state.list = state.list.filter((user: User) => user.id !== action.payload.id);
      state.status = 'completed';
    },
    usersFail(state: UsersState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = 'completed';
    }
  }
});

const userActions = usersSlice.actions;

export const { setUsers, addNewUser, updateExistingUser, deleteExistingUser } = userActions;

export const fetchUsers = (token:  string) => {
  return async (dispatch: Dispatch) => {
    dispatch(userActions.usersRequest({ name: ' LIST' }));
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        users: User[],
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { users } = responseData;
      dispatch(userActions.setUsers({ users }));
    } catch (error) {
      dispatch(userActions.usersFail(error.message))
    }
  }
}

export const addUser = (token:  string, firstName: string, lastName: string, email: string, password: string, role: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(userActions.usersRequest({ name: 'ADD' }));
    try {
      const response = await fetch(`${API_URL}/add-user`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, role }),
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        user: User,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        user
      } = responseData;
      dispatch(userActions.addNewUser(user));
    } catch (error) {
      dispatch(userActions.usersFail(error.message))
    }
  }
}

export const updateUser = (token:  string, id: string, firstName: string, lastName: string, email: string, role: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(userActions.usersRequest({ name: 'UPDATE' }));
    try {
      const response = await fetch(`${API_URL}/update-user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, email, role }),
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        user: User,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        user
      } = responseData;
      dispatch(userActions.updateExistingUser(user));
    } catch (error) {
      dispatch(userActions.usersFail(error.message))
    }
  }
}

export const deleteUser = (token:  string, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(userActions.usersRequest({ name: 'DELETE' }));
    try {
      const response = await fetch(`${API_URL}/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json'
        }
      });
      const responseData: {
        user: User,
        message: string
      } = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }
      const { 
        user
      } = responseData;
      dispatch(userActions.deleteExistingUser({ id: user.id }));
    } catch (error) {
      dispatch(userActions.usersFail(error.message))
    }
  }
}



export default usersSlice;
