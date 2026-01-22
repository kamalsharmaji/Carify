import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";

describe("Bidding SignIn Page", () => {
  test("renders sign in header", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in to access your dealer account/i)).toBeInTheDocument();
  });

  test("switches between OTP and Password modes", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    
    // Default mode should be OTP
    expect(screen.getByText(/Send OTP/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/••••••••/i)).not.toBeInTheDocument();

    // Switch to Password mode
    fireEvent.click(screen.getByText(/Password/i));
    expect(screen.getByText(/Sign In/i, { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();

    // Switch back to OTP
    fireEvent.click(screen.getByText(/OTP/i));
    expect(screen.getByText(/Send OTP/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/••••••••/i)).not.toBeInTheDocument();
  });

  test("submitting form navigates to dashboard", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText(/9876543210/i), { target: { value: '9876543210' } });
    
    const submitBtn = screen.getByRole('button', { name: /Send OTP/i });
    fireEvent.click(submitBtn);

    expect(window.location.pathname).toBe("/bidding/dashboard");
  });

  test("navigates to register page", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    
    const registerLink = screen.getByText(/Register now/i);
    expect(registerLink).toHaveAttribute('href', '/bidding/register');
  });
});
