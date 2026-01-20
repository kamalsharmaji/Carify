import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Recruitment from "./Recruitment";

describe("Recruitment Page", () => {
  test("renders Recruitment page with header", () => {
    render(<Recruitment />);
    expect(screen.getByText("Talent Acquisition")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Recruitment Pipeline/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<Recruitment />);
    expect(screen.getByText("Total Applications")).toBeInTheDocument();
    expect(screen.getByText("482")).toBeInTheDocument();
    expect(screen.getByText("Active Jobs")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  test("filters candidates based on search term", () => {
    render(<Recruitment />);
    const searchInput = screen.getByPlaceholderText("Search candidates...");
    
    // Initial count (default candidates)
    const initialRows = screen.getAllByRole("row");
    // Subtracting header row
    expect(initialRows.length - 1).toBe(5);

    fireEvent.change(searchInput, { target: { value: "Arjun" } });
    
    const filteredRows = screen.getAllByRole("row");
    expect(filteredRows.length - 1).toBe(1);
    expect(screen.getByText("Arjun Mehta")).toBeInTheDocument();
    expect(screen.queryByText("Sita Rao")).not.toBeInTheDocument();
  });

  test("renders status badges with correct text", () => {
    render(<Recruitment />);
    expect(screen.getByText("Interview")).toBeInTheDocument();
    expect(screen.getByText("Screening")).toBeInTheDocument();
    expect(screen.getByText("Offered")).toBeInTheDocument();
  });

  test("renders post job button", () => {
    render(<Recruitment />);
    const postJobBtn = screen.getByText("Post New Job");
    expect(postJobBtn).toBeInTheDocument();
    expect(postJobBtn.closest("button")).toHaveClass("bg-slate-900");
  });
});
