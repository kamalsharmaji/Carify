import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Driver from "./Driver";
import { vi } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Driver Component Responsiveness and UI", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders Driver Personnel title and initial state", () => {
    render(<Driver />);
    expect(screen.getByText(/Driver/i)).toBeInTheDocument();
    expect(screen.getByText(/Personnel/i)).toBeInTheDocument();
    expect(screen.getByText(/Fleet Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Personnel Directory/i)).toBeInTheDocument();
  });

  test("toggles between table and card view", () => {
    render(<Driver />);
    
    // Default is table view
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Switch to card view
    const cardViewBtn = screen.getByTestId("layout-grid-icon").parentElement;
    if (cardViewBtn) fireEvent.click(cardViewBtn);
    
    // Table should be gone
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("opens Onboard Driver form", () => {
    render(<Driver />);
    const addBtn = screen.getByText(/Onboard Driver/i);
    fireEvent.click(addBtn);
    
    expect(screen.getByText(/Register New Personnel/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Deepak Sharma/i)).toBeInTheDocument();
  });

  test("filters drivers based on search input", () => {
    render(<Driver />);
    const searchInput = screen.getByPlaceholderText(/Search by name or email.../i);
    
    fireEvent.change(searchInput, { target: { value: "NonExistent" } });
    expect(screen.getByText(/No Personnel Records/i)).toBeInTheDocument();
  });
});
