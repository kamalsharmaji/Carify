import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AttendanceManagement from "./AttendanceManagement";

describe("AttendanceManagement Page", () => {
  test("renders AttendanceManagement page with header", () => {
    render(<AttendanceManagement />);
    expect(screen.getByText("Shift Intelligence")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Real-time Attendance & Presence/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<AttendanceManagement />);
    expect(screen.getByText("Total Present")).toBeInTheDocument();
    expect(screen.getByText("112")).toBeInTheDocument();
    expect(screen.getByText("Late Check-ins")).toBeInTheDocument();
  });

  test("filters attendance records based on search term", () => {
    render(<AttendanceManagement />);
    const searchInput = screen.getByPlaceholderText("Search staff...");
    
    fireEvent.change(searchInput, { target: { value: "Amit" } });
    
    expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Neha Verma")).not.toBeInTheDocument();
  });

  test("renders status badges correctly", () => {
    render(<AttendanceManagement />);
    expect(screen.getAllByText("Present").length).toBeGreaterThan(0);
    expect(screen.getByText("Absent")).toBeInTheDocument();
    expect(screen.getByText("Late")).toBeInTheDocument();
    expect(screen.getByText("Half Day")).toBeInTheDocument();
  });

  test("renders export log button", () => {
    render(<AttendanceManagement />);
    expect(screen.getByText("Export Log")).toBeInTheDocument();
  });
});
