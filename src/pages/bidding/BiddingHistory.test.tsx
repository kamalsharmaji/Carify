import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BiddingHistory from "./BiddingHistory";

describe("BiddingHistory Page", () => {
  test("renders bidding history header", () => {
    render(<BiddingHistory />);
    expect(screen.getByText(/Bidding History/i)).toBeInTheDocument();
  });

  test("renders empty history message", () => {
    render(<BiddingHistory />);
    expect(screen.getByText(/Your past auction participation history will appear here/i)).toBeInTheDocument();
  });
});
