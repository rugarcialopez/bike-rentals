import React from "react";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter } from "react-router-dom";
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import EditUserPage from "./EditUserPage";
import { setUsers } from "../store/users-slice";
import User from "../models/User";


describe('Edit user page', () => {

  const renderEditUser = (): RenderResult => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/1"]}>
          <ChakraProvider theme={theme}>
            <EditUserPage />
          </ChakraProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  test('Update an existing user', async () => {
    let fakeFetch: jest.Mock;
    fakeFetch = jest.fn();
    window.fetch = fakeFetch;

    renderEditUser();
    store.dispatch(setUsers({ users: [{ id: '1', firstName: 'Learner', lastName: 'Three', email: 'learner03@example.com', role: 'user'}]}))
    const initialLength = store.getState().users.list.length;

  
    let firstNameInput = screen.getByPlaceholderText('First name');
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { value: 'Learner updated' } });
    expect(firstNameInput).toHaveValue('Learner updated');

    let lastNameInput = screen.getByPlaceholderText('Last name');
    expect(lastNameInput).toBeInTheDocument();
    fireEvent.change(lastNameInput, { target: { value: 'Three updated' } });
    expect(lastNameInput).toHaveValue('Three updated');

    let emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'learner03@example.com' } });
    expect(emailInput).toHaveValue('learner03@example.com');

    let passwordInput = screen.queryByPlaceholderText('Password');
    expect(passwordInput).not.toBeInTheDocument();
  
    let roleSelect = screen.getByTestId('select-user-role');
    userEvent.selectOptions(roleSelect, ['manager']);
    expect(roleSelect).toHaveValue('manager');

    fakeFetch
      .mockResolvedValueOnce({
        json: async () => ({ user: {
          id: '1',
          firstName: 'Learner updated',
          lastName: 'Three updated',
          email: 'learner03@example.com',
          role: 'manager'
        } }),
        ok: true
      });

    let submitButton = screen.getByText('Update');
    fireEvent.click(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    
    await waitFor(() => {
      const users: User[] = store.getState().users.list;
      return users[0].firstName === 'Learner updated' && users[0].lastName === 'Three updated';
    });
    let users: User[] = store.getState().users.list;
    expect(users[0].lastName).toBe('Three updated');
    expect(users[0].email).toBe('learner03@example.com');
    expect(users[0].role).toBe('manager');
    expect(initialLength).toEqual(store.getState().users.list.length);
  });

});

  