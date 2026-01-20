import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaLibrary from "./MediaLibrary";

describe("MediaLibrary Page", () => {
  test("renders MediaLibrary page with header", () => {
    render(<MediaLibrary />);
    expect(screen.getByText("Media Assets")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Brand & Multimedia Repository/i)).toBeInTheDocument();
  });

  test("renders filter tabs", () => {
    render(<MediaLibrary />);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Images/i)).toBeInTheDocument();
    expect(screen.getByText(/Videos/i)).toBeInTheDocument();
  });

  test("filters assets based on search term", () => {
    render(<MediaLibrary />);
    const searchInput = screen.getByPlaceholderText("Search assets...");
    
    fireEvent.change(searchInput, { target: { value: "Event" } });
    
    expect(screen.getByText("Company_Event_01.jpg")).toBeInTheDocument();
    expect(screen.queryByText("CEO_Podcast_Jan.mp3")).not.toBeInTheDocument();
  });

  test("toggles between grid and list view", () => {
    render(<MediaLibrary />);
    // Default is grid view
    expect(screen.queryByRole("table")).not.toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    const listToggleBtn = buttons.find(b => b.innerHTML.includes("lucide-list"));
    
    if (listToggleBtn) {
        fireEvent.click(listToggleBtn);
        expect(screen.getByRole("table")).toBeInTheDocument();
    }
  });

  test("renders add media button", () => {
    render(<MediaLibrary />);
    expect(screen.getByText("Add Media")).toBeInTheDocument();
  });
});
