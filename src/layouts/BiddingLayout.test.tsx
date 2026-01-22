import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BiddingLayout from "./BiddingLayout";

describe("BiddingLayout Component", () => {
  test("renders navbar with logo and links", () => {
    render(
      <BrowserRouter>
        <BiddingLayout />
      </BrowserRouter>
    );
    expect(screen.getAllByAltText(/Carify Logo/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Membership/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  test("renders sign in and register buttons", () => {
    render(
      <BrowserRouter>
        <BiddingLayout />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Become a Dealer/i })).toBeInTheDocument();
  });

  test("toggles mobile menu", () => {
    render(
      <BrowserRouter>
        <BiddingLayout />
      </BrowserRouter>
    );
    
    // Mobile menu button is only visible in small screens, but we can find it by its icon's parent
    const menuButton = screen.getByRole('button', { name: "" }); // lucide-react icons usually don't have text
    
    // Initial state: menu links should be visible in desktop nav, but mobile menu content should be hidden
    // In our test environment, we don't have CSS media queries effect on visibility unless we use specialized tools.
    // However, we can check if the state change renders the mobile menu links.
    
    fireEvent.click(menuButton);
    
    // After click, the mobile nav should be rendered
    // The navLinks are rendered twice (once for desktop, once for mobile)
    const homeLinks = screen.getAllByText(/Home/i);
    expect(homeLinks.length).toBeGreaterThan(1);
  });

  test("renders footer", () => {
    render(
      <BrowserRouter>
        <BiddingLayout />
      </BrowserRouter>
    );
    expect(screen.getByText(/© 2026 AutoBSE. Part of Carify ERP./i)).toBeInTheDocument();
    expect(screen.getByText(/Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy/i)).toBeInTheDocument();
  });
});
