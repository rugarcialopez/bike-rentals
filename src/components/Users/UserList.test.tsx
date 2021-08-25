import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import AuthContext from "../../store/auth-context";
import { MemoryRouter } from "react-router-dom";
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import UsersList from "./UsersList";
import store from "../../store/index";

describe('User List', () => {

  const authContextObj = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    role: 'user',
    userId: '1',
    isLoggedIn: true,
    login: (token: string, role: string, expirationTime: string, userId: string) => {},
    logout: () => {},
  }

  const users = [
    {
      id: '2',
      firstName: 'Learner',
      lastName: 'One',
      email: 'learner01@example.com',
      role: 'user'
    },
    {
      id: '3',
      firstName: 'Learner',
      lastName: 'Two',
      email: 'learner02@example.com',
      role: 'user'
      }
  ];
  const usersSlice = createSlice({
    name: 'users',
    initialState: {
      error: '',
      list: users,
      status: 'completed',
      name: 'LIST'
    },
    reducers: {}
  });

  const mockStore = configureStore({
    reducer: { users: usersSlice.reducer }
  })

  test('renders no users message', () => {
    render(
      <Provider store={store}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersList />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );
    const infoMessage = screen.getByText('There are no users');
    expect(infoMessage).toBeInTheDocument();
  })

  test('renders the name of the users', () => {
    render(
      <Provider store={mockStore}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersList />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );

    const learnerOne = screen.getByText(/Learner One/i);
    expect(learnerOne).toBeInTheDocument();
    const learnerTwo = screen.getByText(/Learner Two/i);
    expect(learnerTwo).toBeInTheDocument();
  });

  test('renders the email of the users', () => {
    render(
      <Provider store={mockStore}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersList />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );
    const learnerOne = screen.getByText('learner01@example.com');
    expect(learnerOne).toBeInTheDocument();
    const learnerTwo = screen.getByText('learner02@example.com');
    expect(learnerTwo).toBeInTheDocument();
  });

});