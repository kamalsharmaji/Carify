import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Careers from "./Careers";

describe("Careers Page", () => {
  test("renders careers page header", () => {
    render(<Careers />);
    expect(screen.getByText(/Build the Future of/i)).toBeInTheDocument();
    expect(screen.getByText(/Vehicle Auctions/i)).toBeInTheDocument();
  });

  test("renders career statistics", () => {
    render(<Careers />);
    expect(screen.getByText(/200\+/i)).toBeInTheDocument();
    expect(screen.getByText(/300%/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Members/i)).toBeInTheDocument();
  });

  test("renders open positions", () => {
    render(<Careers />);
    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Auction Operations Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/UI\/UX Designer/i)).toBeInTheDocument();
  });
});
