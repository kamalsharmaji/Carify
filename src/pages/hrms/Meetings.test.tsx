import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Meetings from "./Meetings";

describe("Meetings Page", () => {
  test("renders Meetings page with header", () => {
    render(<Meetings />);
    expect(screen.getByText("Event Scheduler")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Collaborative Meetings & Sessions/i)).toBeInTheDocument();
  });

  test("renders calendar strip with months", () => {
    render(<Meetings />);
    expect(screen.getByText("January 2024")).toBeInTheDocument();
    expect(screen.getByText("Mon")).toBeInTheDocument();
  });

  test("filters meetings based on search term", () => {
    render(<Meetings />);
    const searchInput = screen.getByPlaceholderText("Search meetings...");
    
    fireEvent.change(searchInput, { target: { value: "Operations" } });
    
    expect(screen.getByText("Monthly Operations Review")).toBeInTheDocument();
    expect(screen.queryByText("Quarterly Strategy Session")).not.toBeInTheDocument();
  });

  test("renders meeting status badges", () => {
    render(<Meetings />);
    expect(screen.getAllByText("Upcoming").length).toBeGreaterThan(0);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("renders schedule meeting button", () => {
    render(<Meetings />);
    expect(screen.getByText("Schedule Meeting")).toBeInTheDocument();
  });
});
