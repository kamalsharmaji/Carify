import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PayrollManagement from "./PayrollManagement";

describe("PayrollManagement Page", () => {
  test("renders PayrollManagement page with header", () => {
    render(<PayrollManagement />);
    expect(screen.getByText("Financial Operations")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Compensation & Payroll Intelligence/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<PayrollManagement />);
    expect(screen.getByText("Total Disbursed")).toBeInTheDocument();
    expect(screen.getByText("₹45.2L")).toBeInTheDocument();
    expect(screen.getByText("Bonus & Incentives")).toBeInTheDocument();
  });

  test("filters payroll records based on search term", () => {
    render(<PayrollManagement />);
    const searchInput = screen.getByPlaceholderText("Search name...");
    
    fireEvent.change(searchInput, { target: { value: "Amit" } });
    
    expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Neha Verma")).not.toBeInTheDocument();
  });

  test("renders status badges correctly", () => {
    render(<PayrollManagement />);
    expect(screen.getAllByText("Paid").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Processing").length).toBeGreaterThan(0);
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("On Hold")).toBeInTheDocument();
  });

  test("renders run payroll button", () => {
    render(<PayrollManagement />);
    expect(screen.getByText("Run Payroll")).toBeInTheDocument();
  });
});
