import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Currencies from "./Currencies";

describe("Currencies Page", () => {
  test("renders Currencies page with header", () => {
    render(<Currencies />);
    expect(screen.getByText("Exchange Matrix")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Global Payroll & Currency Management/i)).toBeInTheDocument();
  });

  test("renders currency cards correctly", () => {
    render(<Currencies />);
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("United States Dollar")).toBeInTheDocument();
    expect(screen.getByText("₹82.50")).toBeInTheDocument();
  });

  test("filters currencies based on search term", () => {
    render(<Currencies />);
    const searchInput = screen.getByPlaceholderText("Search currencies...");
    
    fireEvent.change(searchInput, { target: { value: "EUR" } });
    
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.queryByText("USD")).not.toBeInTheDocument();
  });

  test("renders global market insight section", () => {
    render(<Currencies />);
    expect(screen.getByText("Multi-Regional Payroll Coverage")).toBeInTheDocument();
    expect(screen.getByText("45+")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
  });

  test("renders add currency button", () => {
    render(<Currencies />);
    expect(screen.getByText("Add Currency")).toBeInTheDocument();
  });
});
