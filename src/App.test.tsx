import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"
import { AuthProvider } from "./store/auth-context";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";

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
  });


});