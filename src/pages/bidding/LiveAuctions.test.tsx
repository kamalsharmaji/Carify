import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LiveAuctions from "./LiveAuctions";

describe("LiveAuctions Page", () => {
  test("renders live auctions header", () => {
    render(<LiveAuctions />);
    expect(screen.getByText(/Live Auctions/i)).toBeInTheDocument();
  });

  test("renders no live auctions empty state", () => {
    render(<LiveAuctions />);
    expect(screen.getByText(/No Live Auctions/i)).toBeInTheDocument();
    expect(screen.getByText(/Check back later for upcoming car auctions/i)).toBeInTheDocument();
  });
});
