import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blogs from "./Blogs";

describe("Blogs Page", () => {
  test("renders blogs page header", () => {
    render(<Blogs />);
    expect(screen.getByText(/Carify/i)).toBeInTheDocument();
    expect(screen.getByText(/Insights/i)).toBeInTheDocument();
  });

  test("renders blog posts", () => {
    render(<Blogs />);
    expect(screen.getByText(/Market Trends: The Rise of Luxury SUVs in India/i)).toBeInTheDocument();
    expect(screen.getByText(/How to Maximize Your Profits in Live Auctions/i)).toBeInTheDocument();
    expect(screen.getByText(/The Future of EVs in the Secondary Market/i)).toBeInTheDocument();
  });

  test("renders blog post details", () => {
    render(<Blogs />);
    expect(screen.getAllByText(/Read More/i).length).toBe(3);
    expect(screen.getByText(/Market Insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Bidding Tips/i)).toBeInTheDocument();
  });
});
