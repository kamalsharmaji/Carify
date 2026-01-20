import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LeaveManagement from "./LeaveManagement";

describe("LeaveManagement Page", () => {
  test("renders LeaveManagement page with header", () => {
    render(<LeaveManagement />);
    expect(screen.getByText("Absence Tracking")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Leave & Time-Off Management/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<LeaveManagement />);
    expect(screen.getByText("On Leave Today")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Pending Approvals")).toBeInTheDocument();
  });

  test("filters leave requests based on search term", () => {
    render(<LeaveManagement />);
    const searchInput = screen.getByPlaceholderText("Search requests...");
    
    fireEvent.change(searchInput, { target: { value: "Amit" } });
    
    expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Neha Verma")).not.toBeInTheDocument();
  });

  test("renders status badges correctly", () => {
    render(<LeaveManagement />);
    expect(screen.getAllByText("Approved").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pending").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Rejected").length).toBeGreaterThan(0);
  });

  test("renders apply leave button", () => {
    render(<LeaveManagement />);
    expect(screen.getByText("Apply Leave")).toBeInTheDocument();
  });
});
