import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "./Login";

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Login Page", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders login form correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name@company.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••••••/i)).toBeInTheDocument();
  });

  test("successful login with registered user redirects to dashboard", async () => {
    // Setup a registered user in local storage
    const users = [{ email: "test@example.com", password: "password123", name: "Test User" }];
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/name@company.com/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••••••/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Authorize Login/i));

    await waitFor(() => {
      expect(localStorage.getItem("accessToken")).toContain("demo-token");
    }, { timeout: 2000 });
  });

  test("navigates to register page when 'Register Account' is clicked", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const registerBtn = screen.getByText(/Register Account/i);
    fireEvent.click(registerBtn);
    
    expect(window.location.pathname).toBe("/register");
  });
});
