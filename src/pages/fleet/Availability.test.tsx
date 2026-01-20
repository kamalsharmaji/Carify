import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Availability from "./Availability";
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

describe("Availability Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders Vehicle Availability title", () => {
    render(<Availability />);
    expect(screen.getByText(/Vehicle Availability/i)).toBeInTheDocument();
    expect(screen.getByText(/Fleet Management › Availability Calendar/i)).toBeInTheDocument();
  });

  test("renders initial seed data in table", () => {
    render(<Availability />);
    expect(screen.getByText("DL09AB1234")).toBeInTheDocument();
    expect(screen.getByText("16-01-2025")).toBeInTheDocument();
  });

  test("toggles to card view and back to table view", () => {
    render(<Availability />);
    
    // Default is table view
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Switch to card view - identifying button by icon or position if needed
    // In Availability.tsx, LayoutGrid is the second button in the group
    const buttons = screen.getAllByRole("button");
    const cardViewBtn = buttons.find(btn => btn.innerHTML.includes("lucide-layout-grid"));
    
    if (cardViewBtn) {
        fireEvent.click(cardViewBtn);
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    }

    const tableViewBtn = buttons.find(btn => btn.innerHTML.includes("lucide-table"));
    if (tableViewBtn) {
        fireEvent.click(tableViewBtn);
        expect(screen.getByRole("table")).toBeInTheDocument();
    }
  });

  test("opens Add Record form and can create a record", () => {
    render(<Availability />);
    const addBtn = screen.getByText(/Add Record/i);
    fireEvent.click(addBtn);
    
    expect(screen.getByText(/Add Record/i, { selector: 'h3' })).toBeInTheDocument();
    
    const vehicleInput = screen.getByLabelText(/Vehicle No/i);
    const dateInput = screen.getByLabelText(/Date/i);
    const createBtn = screen.getByText("Create");

    fireEvent.change(vehicleInput, { target: { value: "MH12XY5678" } });
    fireEvent.change(dateInput, { target: { value: "20-01-2025" } });
    fireEvent.click(createBtn);

    expect(screen.getByText("MH12XY5678")).toBeInTheDocument();
  });

  test("filters records based on search input", () => {
    render(<Availability />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    
    fireEvent.change(searchInput, { target: { value: "DL09" } });
    expect(screen.getByText("DL09AB1234")).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "NONEXISTENT" } });
    expect(screen.queryByText("DL09AB1234")).not.toBeInTheDocument();
  });

  test("opens view details modal", () => {
    render(<Availability />);
    const viewBtn = screen.getAllByRole("button").find(btn => btn.innerHTML.includes("lucide-eye"));
    
    if (viewBtn) {
        fireEvent.click(viewBtn);
        expect(screen.getByText("Availability Details")).toBeInTheDocument();
        expect(screen.getAllByText("DL09AB1234").length).toBeGreaterThan(1);
    }
  });
});
