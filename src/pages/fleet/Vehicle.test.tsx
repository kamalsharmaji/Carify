import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Vehicle from "./Vehicle";

describe("Vehicle Page", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders Vehicle page with header", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    expect(screen.getByText("Manage Vehicles")).toBeInTheDocument();
    expect(screen.getByText(/Fleet Management › Vehicle Directory/i)).toBeInTheDocument();
  });

  test("toggles between table and card view", () => {
    const { container } = render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    
    // Default is table view
    expect(container.querySelector("table")).toBeInTheDocument();
    
    // Switch to card view
    const buttons = Array.from(container.querySelectorAll('button'));
    const cardViewBtn = buttons.find(btn => 
      btn.querySelector('svg')?.classList.contains('lucide-layout-grid')
    );
    
    if (cardViewBtn) {
      fireEvent.click(cardViewBtn);
      expect(container.querySelector("table")).not.toBeInTheDocument();
      // Should show cards (looking for vehicle names in cards)
      expect(screen.getByText(/Toyota Fortuner/i)).toBeInTheDocument();
    }
  });

  test("filters vehicles based on search term", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Search vehicles or drivers...");
    
    fireEvent.change(searchInput, { target: { value: "Deepak" } });
    
    expect(screen.getByText(/Toyota Fortuner/i)).toBeInTheDocument();
    expect(screen.queryByText(/Honda City/i)).not.toBeInTheDocument();
  });

  test("opens add vehicle form modal", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    const addBtn = screen.getByText("Add Vehicle");
    
    fireEvent.click(addBtn);
    
    expect(screen.getByText("Add New Vehicle")).toBeInTheDocument();
  });

  test("opens vehicle details modal", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    
    // Find view button in table
    const viewButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-eye')
    );
    
    if (viewButtons.length > 0) {
      fireEvent.click(viewButtons[0]);
      expect(screen.getByText("Vehicle Details")).toBeInTheDocument();
    }
  });
});
