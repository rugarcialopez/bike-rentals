import React from "react";
import { render, screen } from "@testing-library/react";
import SignInForm from "./SignInForm";

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  })

  test('renders Sign In form', () => {
    const signInElement = screen.getByText('Sign in!');
    expect(signInElement).toBeInTheDocument();
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