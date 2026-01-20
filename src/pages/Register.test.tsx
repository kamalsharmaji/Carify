import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
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
    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/john@company.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/9876543210/i)).toBeInTheDocument();
  });

  test("validates step 1 and moves to step 2", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/John Doe/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/john@company.com/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/9876543210/i), {
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
    fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/john@company.com/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/9876543210/i), { target: { value: "1234567890" } });
    fireEvent.click(screen.getByText(/Send Verification/i));

    // Step 2
    await waitFor(() => screen.getByText(/I've Clicked the Link/i));
    fireEvent.click(screen.getByText(/I've Clicked the Link/i));

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
});
