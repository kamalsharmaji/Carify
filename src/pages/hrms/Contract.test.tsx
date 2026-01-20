import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contract from "./Contract";

describe("Contract Page", () => {
  test("renders Contract page with header", () => {
    render(<Contract />);
    expect(screen.getByText("Contract Lifecycle")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Legal & Employment Agreements/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<Contract />);
    expect(screen.getByText("Total Active")).toBeInTheDocument();
    expect(screen.getByText("118")).toBeInTheDocument();
    expect(screen.getByText("Expiring Soon")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
  });

  test("filters contracts based on search term", () => {
    render(<Contract />);
    const searchInput = screen.getByPlaceholderText("Search contracts...");
    
    fireEvent.change(searchInput, { target: { value: "Amit" } });
    
    expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Neha Verma")).not.toBeInTheDocument();
  });

  test("renders status badges correctly", () => {
    render(<Contract />);
    expect(screen.getAllByText("Active").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Expiring Soon").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pending Signature").length).toBeGreaterThan(0);
  });

  test("renders new agreement button", () => {
    render(<Contract />);
    const newAgreementBtn = screen.getByText("New Agreement");
    expect(newAgreementBtn).toBeInTheDocument();
  });
});
