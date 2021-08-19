import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignupForm";

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  })

  test('renders Sign up form', () => {
    const signUpElement = screen.getByText('Sign up!');
    expect(signUpElement).toBeInTheDocument();
  });

  test('renders first name field', () => {
    const firstNameElement = screen.getByPlaceholderText('First name');
    expect(firstNameElement).toBeInTheDocument();
  });

  test('renders last name field', () => {
    const lastNameElement = screen.getByPlaceholderText('Last name');
    expect(lastNameElement).toBeInTheDocument();
  });

  test('renders email field', () => {
    const emailElement = screen.getByPlaceholderText('Email');
    expect(emailElement).toBeInTheDocument();
  });

  test('renders password field', () => {
    const passwordElement = screen.getByPlaceholderText('Password');
    expect(passwordElement).toBeInTheDocument();
  });
});