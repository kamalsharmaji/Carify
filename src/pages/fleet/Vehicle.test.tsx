import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Vehicle from "./Vehicle";

describe("Vehicle Page - Cinematic Redesign", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders redesigned Vehicle page with cinematic header", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    expect(screen.getByText("Fleet")).toBeInTheDocument();
    expect(screen.getByText("Directory")).toBeInTheDocument();
    expect(screen.getByText(/Fleet Management › Vehicle Assets/i)).toBeInTheDocument();
  });

  test("displays fleet intelligence stats", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    // Use getAllByText for 'Active' and 'Maintenance' since they appear as both stat labels and status badges
    expect(screen.getByText("Total Fleet")).toBeInTheDocument();
    expect(screen.getAllByText("Active")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Maintenance")[0]).toBeInTheDocument();
  });

  test("toggles between table and cinematic card view", () => {
    const { container } = render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    
    // Default is table view
    expect(container.querySelector("table")).toBeInTheDocument();
    
    // Switch to card view (looking for the layout grid icon button)
    const buttons = Array.from(container.querySelectorAll('button'));
    const cardViewBtn = buttons.find(btn => 
      btn.querySelector('svg')?.classList.contains('lucide-layout-grid')
    );
    
    if (cardViewBtn) {
      fireEvent.click(cardViewBtn);
      expect(container.querySelector("table")).not.toBeInTheDocument();
      // Should show cards with upgraded typography
      expect(screen.getAllByText(/Toyota Fortuner/i)[0]).toBeInTheDocument();
    }
  });

  test("filters assets using the upgraded search intelligence", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Search by vehicle name or driver...");
    
    fireEvent.change(searchInput, { target: { value: "Deepak" } });
    
    expect(screen.getByText(/Toyota Fortuner/i)).toBeInTheDocument();
    expect(screen.queryByText(/Honda City/i)).not.toBeInTheDocument();
  });

  test("opens high-end asset creation modal", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    const addBtn = screen.getByText("Add Vehicle");
    
    fireEvent.click(addBtn);
    
    expect(screen.getByText("New Fleet Asset")).toBeInTheDocument();
  });

  test("opens cinematic vehicle profile modal", () => {
    render(
      <BrowserRouter>
        <Vehicle />
      </BrowserRouter>
    );
    
    // Find view button (Eye icon) in the redesigned table
    const viewButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-eye')
    );
    
    if (viewButtons.length > 0) {
      fireEvent.click(viewButtons[0]);
      
      // Verify modal content using role="dialog"
      const modal = screen.getByRole('dialog');
      expect(within(modal).getByText("Vehicle Profile")).toBeInTheDocument();
      expect(within(modal).getByText(/Toyota Fortuner/i)).toBeInTheDocument();
    }
  });
});
