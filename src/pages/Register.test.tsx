import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import toast from "react-hot-toast";
import Register from "./Register";

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Register Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renders step 1 fields", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Enter Your Name.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Your Email.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i)).toBeInTheDocument();
  });

  test("validates step 1 and moves to step 2", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Name.../i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email.../i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText(/Send Verification/i));

    await waitFor(() => {
      expect(screen.getByText(/Check Your Email/i)).toBeInTheDocument();
    });
  });

  test("moves to step 3 after simulated verification", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Step 1
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Name.../i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email.../i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i), { target: { value: "1234567890" } });
    fireEvent.click(screen.getByText(/Send Verification/i));

    // Step 2
    await waitFor(() => screen.getByText(/Verify Email Now/i));
    fireEvent.click(screen.getByText(/Verify Email Now/i));

    // Step 3
    await waitFor(() => {
      expect(screen.getByText(/Set Password/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test("navigates to login page when 'Sign In' is clicked", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const signInBtn = screen.getByText(/Sign In/i);
    fireEvent.click(signInBtn);
    
    expect(window.location.pathname).toBe("/login");
  });

  test("shows error if user already exists", async () => {
    const existingUsers = [{ email: "jane@example.com", name: "Jane" }];
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Step 1
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Name.../i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email.../i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i), { target: { value: "1234567890" } });
    fireEvent.click(screen.getByText(/Send Verification/i));

    // Step 2
    await waitFor(() => screen.getByText(/Verify Email Now/i));
    fireEvent.click(screen.getByText(/Verify Email Now/i));

    // Step 3
    await waitFor(() => screen.getByText(/Set Password/i));
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/Complete Registration/i));

    // Should stay on Register page and show error
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("User with this email already exists"),
        expect.any(Object)
      );
    }, { timeout: 2000 });

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    expect(users.length).toBe(1); // Still only 1 user
  });
});
