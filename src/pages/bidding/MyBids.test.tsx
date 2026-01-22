import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyBids from "./MyBids";

describe("MyBids Page", () => {
  test("renders my bids header", () => {
    render(<MyBids />);
    expect(screen.getByText(/My Bids/i)).toBeInTheDocument();
  });

  test("renders bids table with headers", () => {
    render(<MyBids />);
    expect(screen.getByText(/Car Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Last Bid/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  test("renders bid item correctly", () => {
    render(<MyBids />);
    expect(screen.getByText(/2022 BMW M4/i)).toBeInTheDocument();
    expect(screen.getByText(/\$72,500/i)).toBeInTheDocument();
    expect(screen.getByText(/Winning/i)).toBeInTheDocument();
    expect(screen.getByText(/View Auction/i)).toBeInTheDocument();
  });
});
