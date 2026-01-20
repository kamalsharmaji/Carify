import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
  };
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ProtectedRoute - Access Control", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders children when user is authenticated", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test User" }));

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  test("redirects to login when user is not authenticated", () => {
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  test("respects localStorage user token", () => {
    localStorage.setItem("user", "authenticated-user");

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  test("renders without user in localStorage", () => {
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    const content = screen.queryByTestId("protected-content");
    expect(content).not.toBeInTheDocument();
  });
});
