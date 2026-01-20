import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "./LandingPage";

describe("LandingPage Page", () => {
  test("renders LandingPage with header", () => {
    render(<LandingPage />);
    expect(screen.getByText("Experience Designer")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Employee Portal & CMS/i)).toBeInTheDocument();
  });

  test("renders sidebar structure items", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Hero Section/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test("renders live preview browser frame", () => {
    render(<LandingPage />);
    expect(screen.getByText("portal.carify-erp.com/careers")).toBeInTheDocument();
  });

  test("renders preview content hero section", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Join the future of fleet/i)).toBeInTheDocument();
    expect(screen.getByText(/Drive Your Career/i)).toBeInTheDocument();
    expect(screen.getByText("Explore Roles")).toBeInTheDocument();
  });

  test("renders live preview toggle buttons", () => {
    render(<LandingPage />);
    const previewBtn = screen.getByText("Live Preview");
    expect(previewBtn).toBeInTheDocument();
    
    const createBtn = screen.getByText("Create Section");
    expect(createBtn).toBeInTheDocument();
  });
});
