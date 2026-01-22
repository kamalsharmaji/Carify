import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BiddingHome from "./BiddingHome";

describe("BiddingHome Page", () => {
  test("renders hero section with title", () => {
    render(
      <BrowserRouter>
        <BiddingHome />
      </BrowserRouter>
    );
    expect(screen.getByText(/Bid Smart Carify Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Dream Car/i)).toBeInTheDocument();
  });

  test("renders active auction platform status", () => {
    render(
      <BrowserRouter>
        <BiddingHome />
      </BrowserRouter>
    );
    expect(screen.getByText(/LIVE AUCTION PLATFORM IS OPEN/i)).toBeInTheDocument();
  });

  test("renders 'Start Bidding' and 'How it Works' buttons", () => {
    render(
      <BrowserRouter>
        <BiddingHome />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Start Bidding/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /How it Works/i })).toBeInTheDocument();
  });

  test("renders featured auctions section", () => {
    render(
      <BrowserRouter>
        <BiddingHome />
      </BrowserRouter>
    );
    expect(screen.getByText(/Featured Auctions/i)).toBeInTheDocument();
    expect(screen.getByText(/BMW X5 xDrive40i M Sport/i)).toBeInTheDocument();
    expect(screen.getByText(/Porsche 911 Carrera S/i)).toBeInTheDocument();
  });

  test("renders stats section", () => {
    render(
      <BrowserRouter>
        <BiddingHome />
      </BrowserRouter>
    );
    expect(screen.getByText(/Vehicles Auctioned/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified Dealers/i)).toBeInTheDocument();
    expect(screen.getByText(/Cities Covered/i)).toBeInTheDocument();
    expect(screen.getByText(/Transaction Value/i)).toBeInTheDocument();
  });

  test("renders 'Three Easy Steps' section", () => {
    render(
      <BrowserRouter>
        <BiddingHome />
      </BrowserRouter>
    );
    expect(screen.getByText(/Three Easy Steps/i)).toBeInTheDocument();
    expect(screen.getByText(/Find your car/i)).toBeInTheDocument();
    expect(screen.getByText(/Place your bid/i)).toBeInTheDocument();
    expect(screen.getByText(/Fast Delivery/i)).toBeInTheDocument();
  });
});
