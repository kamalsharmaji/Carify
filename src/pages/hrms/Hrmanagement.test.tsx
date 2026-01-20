import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HRManagement from "./Hrmanagement";
import { vi } from "vitest";

describe("HRManagement Page", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders HRManagement page with header", () => {
    render(<HRManagement />);
    expect(screen.getByText("Personnel Directory")).toBeInTheDocument();
    expect(screen.getByText(/HR Management › Global Employee Database/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<HRManagement />);
    expect(screen.getByText("Total Employees")).toBeInTheDocument();
    expect(screen.getByText("Active Contracts")).toBeInTheDocument();
    // "On Leave" appears in both stats and status badges, so use getAllByText
    expect(screen.getAllByText("On Leave")[0]).toBeInTheDocument();
  });

  test("toggles between table and card view", () => {
    const { container } = render(<HRManagement />);
    
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
      // Should show cards (looking for employee names in cards)
      expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
    }
  });

  test("filters employees based on search term", () => {
    render(<HRManagement />);
    const searchInput = screen.getByPlaceholderText("Search staff...");
    
    fireEvent.change(searchInput, { target: { value: "Amit" } });
    
    expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Neha Verma")).not.toBeInTheDocument();
  });

  test("opens add personnel form modal", () => {
    render(<HRManagement />);
    const addBtn = screen.getByText("Add Personnel");
    
    fireEvent.click(addBtn);
    
    expect(screen.getByText("Onboard Personnel")).toBeInTheDocument();
  });

  test("pagination works correctly", () => {
    // Mock localStorage with more than 8 employees to trigger pagination
    const manyEmployees = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      email: `emp${i + 1}@example.com`,
      phone: "1234567890",
      department: "Operations",
      role: "Associate",
      status: "Active",
      joinDate: "2024-01-01",
      location: "Delhi"
    }));
    localStorage.setItem("hrm_employees", JSON.stringify(manyEmployees));

    render(<HRManagement />);
    
    const paginationText = screen.getByText(/Showing/i, { exact: false });
    expect(paginationText).toHaveTextContent("1-8");
    expect(paginationText).toHaveTextContent("10 Employees");
  });
});
