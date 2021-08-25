import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AuthContext from "../store/auth-context";
import { MemoryRouter } from "react-router-dom";
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import store from "../store/index";
import UsersPage from "./UsersPage";

describe('Users page', () => {
  const authContextObj = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    role: 'user',
    userId: '1',
    isLoggedIn: true,
    login: (token: string, role: string, expirationTime: string, userId: string) => {},
    logout: () => {},
  }

  let fakeFetch: jest.Mock;

  beforeEach(() => {
    fakeFetch = jest.fn();
    window.fetch = fakeFetch;
  });

  afterEach(() => {
    fakeFetch.mockClear();
  });

  test('Renders an info message when there a no users', async () => {
    fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ users: [] }),
        ok: true
      });
    render(
      <Provider store={store}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersPage />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );
    const infoMessage = await screen.findByText('There are no users');
    expect(infoMessage).toBeInTheDocument();
    expect(store.getState().users.list.length).toEqual(0);
  });

  test('Renders a list of users', async () => {
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
    fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ users }),
        ok: true
      });
    render(
      <Provider store={store}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersPage />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );
    const learnerOne = await screen.findByText('learner01@example.com');
    expect(learnerOne).toBeInTheDocument();
    const learnerTwo = await screen.findByText('learner02@example.com');
    expect(learnerTwo).toBeInTheDocument();
    expect(store.getState().users.list.length).toEqual(2);
  });

  test('Remove a user from the list of users', async() => {
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
    fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ users }),
        ok: true
      })
      .mockResolvedValueOnce({
        json: async () => ({ user: {
          id: '2',
          firstName: 'Learner',
          lastName: 'One',
          email: 'learner01@example.com',
          role: 'user'
        } }),
        ok: true
      });
    render(
      <Provider store={store}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersPage />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );
    const removeButtons = await screen.findAllByText('Remove');
    expect(removeButtons.length).toEqual(2);
    fireEvent.click(removeButtons[0]);
    const learnerTwo = await screen.findByText('learner02@example.com');
    expect(learnerTwo).toBeInTheDocument();
    const learnerOne = screen.queryByText('learner01@example.com');
    expect(learnerOne).not.toBeInTheDocument();
    expect(store.getState().users.list.length).toEqual(1);
  })

  test('Renders an error if the request fails', async () => {
    fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ message: 'There is an error in the API' }),
        ok: false
      });
    render(
      <Provider store={store}>
          <AuthContext.Provider value={authContextObj}>
          <MemoryRouter initialEntries={["/users"]}>
            <ChakraProvider theme={theme}>
              <UsersPage />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthContext.Provider>
      </Provider>        
    );
    const errorMessage = await screen.findByText('There is an error in the API');
    expect(errorMessage).toBeInTheDocument();
  });
});