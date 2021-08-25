import React from "react";
import { screen, render} from "@testing-library/react";
import { App } from "./App";
import AuthContext, { AuthProvider } from "./store/auth-context";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store/index";

describe('App', () => {

  describe('Main page', () => {
    beforeEach(() => {
      render(
        <AuthProvider>
          <BrowserRouter>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider> 
          </BrowserRouter>
        </AuthProvider>
      )
    });

    test('renders welcome page', () => {
      const welcomeHeading = screen.getByText(/Welcome to Bike Rentals app/i);
      expect(welcomeHeading).toBeInTheDocument();
    });

    test('renders login link', () => {
      const linkElement = screen.getByText(/login/i);
      expect(linkElement).toBeInTheDocument();
    });
  });

  describe('Routes', () => {

    let fakeFetch: jest.Mock;

    beforeEach(() => {
      fakeFetch = jest.fn();
      window.fetch = fakeFetch;
    });

    afterEach(() => {
      fakeFetch.mockClear();
    })

    test('renders <AuthPage /> for "/login" route', () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={["/login"]}>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthProvider>
      );
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0].textContent).toBe('Sign Up');
      expect(tabs[1].textContent).toBe('Sign In');
    });

    test('renders <NotFoundPage /> when route is  unknown  and user is logged in', () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={["/unknown"]}>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </MemoryRouter> 
        </AuthProvider>
      );
      const pageNotFound = screen.getByText(/Page not found!/i);
      expect(pageNotFound).toBeInTheDocument();
    });

    test('renders <UsersPage /> for "/users" route when user is logged in and role is manager', async () => {
      const authContextObj = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        role: 'manager',
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
   
      fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ users }),
        ok: true
      })
      render(
        <AuthContext.Provider value={authContextObj}>
          <Provider store={store}>
            <MemoryRouter initialEntries={["/users"]}>
              <ChakraProvider theme={theme}>
                <App />
              </ChakraProvider>
            </MemoryRouter> 
          </Provider>
        </AuthContext.Provider>       
      );
      const learnerOne = await screen.findByText(/Learner One/i);
      expect(learnerOne).toBeInTheDocument();
      const learnerTwo = await screen.findByText(/Learner Two/i);
      expect(learnerTwo).toBeInTheDocument();
    });

    test('does not render <UsersPage /> for "/users" route when user is logged in and role is user', async () => {
      const authContextObj = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        role: 'user',
        userId: '1',
        isLoggedIn: true,
        login: (token: string, role: string, expirationTime: string, userId: string) => {},
        logout: () => {},
      }
      
      render(
        <Provider store={store}>
            <AuthContext.Provider value={authContextObj}>
            <MemoryRouter initialEntries={["/users"]}>
              <ChakraProvider theme={theme}>
                <App />
              </ChakraProvider>
            </MemoryRouter> 
          </AuthContext.Provider>
        </Provider>        
      );
      const pageNotFound = screen.getByText(/Page not found!/i);
      expect(pageNotFound).toBeInTheDocument();
    });

  });

});