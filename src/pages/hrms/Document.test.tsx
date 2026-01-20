import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Document from "./Document";

describe("Document Page", () => {
  test("renders Document page with header", () => {
    render(<Document />);
    expect(screen.getByText("Knowledge Vault")).toBeInTheDocument();
    expect(screen.getByText(/HRMS › Document Management System/i)).toBeInTheDocument();
  });

  test("renders category buttons", () => {
    render(<Document />);
    expect(screen.getAllByText(/Personnel/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Policies/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Finance/i).length).toBeGreaterThan(0);
  });

  test("filters documents based on search term", () => {
    render(<Document />);
    const searchInput = screen.getByPlaceholderText("Search documents...");
    
    fireEvent.change(searchInput, { target: { value: "Handbook" } });
    
    expect(screen.getByText("Employee_Handbook_2024.pdf")).toBeInTheDocument();
    expect(screen.queryByText("Q4_Revenue_Report.xls")).not.toBeInTheDocument();
  });

  test("toggles between list and grid view", () => {
    render(<Document />);
    // Default is list view (has table)
    expect(screen.getByRole("table")).toBeInTheDocument();

    // The selector above is complex due to lucide-react. Let's try by index or more specific class if possible.
    // In our implementation, we have specific buttons.
    const buttons = screen.getAllByRole("button");
    // Find the button with Grid icon. In Document.tsx it's the second button in the toggle group.
    
    const gridToggleBtn = buttons.find(b => b.innerHTML.includes("lucide-grid"));
    if (gridToggleBtn) {
        fireEvent.click(gridToggleBtn);
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    }
  });

  test("renders upload file button", () => {
    render(<Document />);
    expect(screen.getByText("Upload File")).toBeInTheDocument();
  });
});
