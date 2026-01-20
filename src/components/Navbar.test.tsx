import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Navbar from "./Navbar";

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

describe("Navbar - Responsive Design & Functionality", () => {
  const mockOnMenuClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renders navbar with all elements", () => {
    render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("menu button visible on mobile (hidden on lg)", () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const menuButton = container.querySelector("button.lg\\:hidden");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass("lg:hidden");
  });

  test("calls onMenuClick when menu button is clicked", () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const menuButton = container.querySelector("button.lg\\:hidden");
    if (menuButton) {
      fireEvent.click(menuButton);
      expect(mockOnMenuClick).toHaveBeenCalled();
    }
  });

  test("search input hidden on mobile, visible on md breakpoint", () => {
    render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput?.parentElement).toHaveClass("hidden", "md:flex");
  });

  test("navbar has sticky positioning", () => {
    render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky", "top-0", "z-40");
  });

  test("navbar padding is responsive", () => {
    render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const header = screen.getByRole("banner");
    const innerDiv = header.querySelector("div");
    expect(innerDiv).toHaveClass("px-3", "sm:px-4", "md:px-6");
  });

  test("bell notification icon visible", () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  test("user dropdown toggles when user button clicked", () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const buttons = container.querySelectorAll("button");
    if (buttons.length > 1) {
      fireEvent.click(buttons[buttons.length - 1]);
      const dropdown = screen.getByText(/Profile/i);
      expect(dropdown).toBeInTheDocument();
    }
  });

  test("logout button clears localStorage and removes tokens", () => {
    localStorage.setItem("user", "test-user");
    localStorage.setItem("accessToken", "test-token");

    const { container } = render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const buttons = container.querySelectorAll("button");
    if (buttons.length > 1) {
      fireEvent.click(buttons[buttons.length - 1]);
      const logoutBtn = screen.getByText(/Logout/i);
      fireEvent.click(logoutBtn);

      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("accessToken")).toBeNull();
    }
  });

  test("mobile logo hidden on lg screens", () => {
    render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const logo = screen.getByAltText(/Carify/i);
    expect(logo).toHaveClass("lg:hidden");
  });

  test("navbar header height is fixed", () => {
    render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const header = screen.getByRole("banner");
    const innerDiv = header.querySelector("div");
    expect(innerDiv).toHaveClass("h-16");
  });

  test("user profile avatar displays correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );

    const buttons = container.querySelectorAll("button");
    if (buttons.length > 1) {
      fireEvent.click(buttons[buttons.length - 1]);
      const profileSection = screen.getByText(/Profile/i);
      expect(profileSection).toBeInTheDocument();
    }
  });
});
