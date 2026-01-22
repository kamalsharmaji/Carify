import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Booking from "./Booking";
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

describe("Booking Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders Fleet Bookings title and initial state", () => {
    render(<Booking />);
    expect(screen.getByText(/Fleet/i)).toBeInTheDocument();
    expect(screen.getByText(/Bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/Reservation & Logistics/i)).toBeInTheDocument();
  });

  test("toggles between table and card view", () => {
    render(<Booking />);
    
    // Default is table view
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Switch to card view (LayoutGrid icon)
    const cardViewBtn = screen.getByTestId("layout-grid-icon").parentElement;
    if (cardViewBtn) fireEvent.click(cardViewBtn);
    
    // Table should be gone
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("opens New Booking form", () => {
    render(<Booking />);
    const addBtn = screen.getByText(/New Booking/i);
    fireEvent.click(addBtn);
    
    expect(screen.getByText(/Asset Acquisition/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. DL09AB1234/i)).toBeInTheDocument();
  });

  test("filters bookings based on search input", () => {
    render(<Booking />);
    const searchInput = screen.getByPlaceholderText(/Search reservations.../i);
    
    fireEvent.change(searchInput, { target: { value: "NonExistent" } });
    expect(screen.getByText(/No Active Reservations/i)).toBeInTheDocument();
  });
});
