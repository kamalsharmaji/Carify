import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimeTracking from "./TimeTracking";

describe("TimeTracking Page", () => {
  test("renders TimeTracking page with header", () => {
    render(<TimeTracking />);
    expect(screen.getByText("Performance Clock")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Productivity & Task Intelligence/i)).toBeInTheDocument();
  });

  test("renders active timer section", () => {
    render(<TimeTracking />);
    expect(screen.getByText("Now Tracking")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("What are you working on?")).toBeInTheDocument();
    expect(screen.getByText("00:42:15")).toBeInTheDocument();
  });

  test("toggles timer state on button click", () => {
    render(<TimeTracking />);
    const toggleBtn = screen.getByLabelText(/Start Timer/i);
    
    fireEvent.click(toggleBtn);
    expect(screen.getByLabelText(/Pause Timer/i)).toBeInTheDocument();
  });

  test("renders log history table", () => {
    render(<TimeTracking />);
    expect(screen.getByText("Time Log History")).toBeInTheDocument();
    expect(screen.getAllByText("ERP Modernization").length).toBeGreaterThan(0);
    expect(screen.getByText("Fleet UI Refactor")).toBeInTheDocument();
  });

  test("renders status badges in table", () => {
    render(<TimeTracking />);
    expect(screen.getAllByText("Completed").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active").length).toBeGreaterThan(0);
  });
});
