import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "./About";

describe("About Page", () => {
  test("renders about page header", () => {
    render(<About />);
    expect(screen.getByText(/Revolutionizing/i)).toBeInTheDocument();
    expect(screen.getByText(/Vehicle Auctions/i)).toBeInTheDocument();
  });

  test("renders our mission section", () => {
    render(<About />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/democratize the vehicle auction industry/i)).toBeInTheDocument();
  });

  test("renders foundation stats", () => {
    render(<About />);
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/Founded/i)).toBeInTheDocument();
    expect(screen.getByText(/500\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Members/i)).toBeInTheDocument();
  });
});
