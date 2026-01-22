import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BiddingDashboard from "./BiddingDashboard";

describe("BiddingDashboard Page", () => {
  test("renders dealer portal header", () => {
    render(
      <BrowserRouter>
        <BiddingDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Dealer Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome back, Elite Motors/i)).toBeInTheDocument();
  });

  test("renders stats grid", () => {
    render(
      <BrowserRouter>
        <BiddingDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Active Bids/i)).toBeInTheDocument();
    expect(screen.getByText(/Winning Lots/i)).toBeInTheDocument();
    expect(screen.getByText(/Wallet Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Avg. Profit\/Unit/i)).toBeInTheDocument();
  });

  test("renders recommended vehicles", () => {
    render(
      <BrowserRouter>
        <BiddingDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Recommended for You/i)).toBeInTheDocument();
    expect(screen.getByText(/2022 BMW M4 Competition/i)).toBeInTheDocument();
    expect(screen.getByText(/2022 Audi RS7 Sportback/i)).toBeInTheDocument();
  });

  test("renders live activity section", () => {
    render(
      <BrowserRouter>
        <BiddingDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Live Activity/i)).toBeInTheDocument();
    expect(screen.getAllByText(/New bid on BMW M4/i).length).toBeGreaterThan(0);
  });

  test("renders join live auction button", () => {
    render(
      <BrowserRouter>
        <BiddingDashboard />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Join Live Auction/i })).toBeInTheDocument();
  });
});
