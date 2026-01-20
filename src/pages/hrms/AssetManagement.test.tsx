import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssetManagement from "./AssetManagement";

describe("AssetManagement Page", () => {
  test("renders AssetManagement page with header", () => {
    render(<AssetManagement />);
    expect(screen.getByText("Inventory Tracking")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Enterprise Asset & Resource Hub/i)).toBeInTheDocument();
  });

  test("renders stats cards correctly", () => {
    render(<AssetManagement />);
    expect(screen.getByText("Total Assets")).toBeInTheDocument();
    expect(screen.getByText("245")).toBeInTheDocument();
    expect(screen.getByText("Allocated")).toBeInTheDocument();
  });

  test("filters assets based on search term", () => {
    render(<AssetManagement />);
    const searchInput = screen.getByPlaceholderText("Search assets...");
    
    fireEvent.change(searchInput, { target: { value: "MacBook" } });
    
    expect(screen.getByText("MacBook Pro M2")).toBeInTheDocument();
    expect(screen.queryByText("iPhone 15 Pro")).not.toBeInTheDocument();
  });

  test("renders asset status badges", () => {
    render(<AssetManagement />);
    expect(screen.getAllByText("Allocated").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Available").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Maintenance").length).toBeGreaterThan(0);
  });

  test("renders add asset button", () => {
    render(<AssetManagement />);
    expect(screen.getByText("Add Asset")).toBeInTheDocument();
  });
});
