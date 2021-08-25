import React from "react";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import AddUserPage from "./AddUserPage";
import store from "../store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import User from "../models/User";


describe('Add user page', () => {
  const history = createMemoryHistory();

  const renderAddUser = (): RenderResult =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <ChakraProvider theme={theme}>
          <AddUserPage />
        </ChakraProvider>
      </Router>
    </Provider>
  );

  test('Create a new user', async () => {
    
    let fakeFetch: jest.Mock;
    fakeFetch = jest.fn();
    window.fetch = fakeFetch;

    renderAddUser();
    const initialLength = store.getState().users.list.length;
  
    let firstNameInput = screen.getByPlaceholderText('First name');
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { value: 'Learner' } });
    expect(firstNameInput).toHaveValue('Learner');

    let lastNameInput = screen.getByPlaceholderText('Last name');
    expect(lastNameInput).toBeInTheDocument();
    fireEvent.change(lastNameInput, { target: { value: 'Three' } });
    expect(lastNameInput).toHaveValue('Three');

    let emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'learner03@example.com' } });
    expect(emailInput).toHaveValue('learner03@example.com');

    let passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'xxxxxxxxx' } });
    expect(passwordInput).toHaveValue('xxxxxxxxx');
  
    let roleSelect = screen.getByTestId('select-user-role');
    userEvent.selectOptions(roleSelect, ['user']);
    expect(roleSelect).toHaveValue('user');

    fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ user: {
          id: '1',
          firstName: 'Learner',
          lastName: 'Three',
          email: 'learner03@example.com',
          role: 'user'
        } }),
        ok: true
      });

    let submitButton = screen.getByText('Add');
    fireEvent.click(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    
    await waitFor(() => history.location.pathname === '/users');
    let newLength = store.getState().users.list.length;
    expect(newLength).toBeGreaterThan(initialLength);
    let users: User[] = store.getState().users.list;
    expect(users[0].firstName).toBe('Learner');
    expect(users[0].lastName).toBe('Three');
    expect(users[0].email).toBe('learner03@example.com');
    expect(users[0].role).toBe('user');
  });

});

  