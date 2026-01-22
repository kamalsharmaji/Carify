import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";
import { vi } from "vitest";

describe("Bidding Register Page", () => {
  test("renders registration form fields", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/John/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ABCDE1234F/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/9876543210/i)).toBeInTheDocument();
    expect(screen.getByText(/I accept the/i)).toBeInTheDocument();
  });

  test("submitting form navigates to dashboard", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByPlaceholderText(/John/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Doe/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/ABCDE1234F/i), { target: { value: 'ABCDE1234F' } });
    fireEvent.change(screen.getByPlaceholderText(/9876543210/i), { target: { value: '9876543210' } });
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const submitBtn = screen.getByRole('button', { name: /Send OTP/i });
    fireEvent.click(submitBtn);

    expect(window.location.pathname).toBe("/bidding/dashboard");
  });

  test("navigates to sign in page", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const signInLink = screen.getByText(/Sign in/i);
    expect(signInLink).toHaveAttribute('href', '/bidding/login');
  });
});
