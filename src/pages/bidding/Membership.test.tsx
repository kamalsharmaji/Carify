import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Membership from "./Membership";

describe("Membership Page", () => {
  test("renders membership plans", () => {
    render(<Membership />);
    expect(screen.getByText(/Starter/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro Dealer/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise/i)).toBeInTheDocument();
  });

  test("renders plan prices", () => {
    render(<Membership />);
    expect(screen.getByText(/₹4,999/i)).toBeInTheDocument();
    expect(screen.getByText(/₹14,999/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Custom/i).length).toBeGreaterThan(0);
  });

  test("renders features for each plan", () => {
    render(<Membership />);
    expect(screen.getByText(/Access to 5 Auctions\/mo/i)).toBeInTheDocument();
    expect(screen.getByText(/Unlimited Auctions/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-user Access/i)).toBeInTheDocument();
  });

  test("highlights most popular plan", () => {
    render(<Membership />);
    expect(screen.getByText(/Most Popular/i)).toBeInTheDocument();
  });
});
