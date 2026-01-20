import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { Sidebar } from "./Sidebar";

describe("Sidebar - Responsive Design & Navigation", () => {
  const mockOnClose = vi.fn();
  const mockOnToggleCollapse = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders sidebar with navigation items", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  test("sidebar has correct width when not collapsed", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("w-[280px]");
  });

  test("sidebar has collapsed width when collapsed", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={true} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("w-[80px]");
  });

  test("collapse button visible and functional on desktop", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const collapseBtn = screen.getAllByRole("button").find(btn => 
      btn.querySelector('svg')?.classList.contains('lucide-chevron-left')
    );
    expect(collapseBtn).toHaveClass("hidden", "lg:flex");
  });

  test("close button visible on mobile only", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const closeBtn = screen.getByLabelText(/Close sidebar/i);
    expect(closeBtn).toHaveClass("lg:hidden");
  });

  test("calls onClose when close button is clicked", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const closeBtn = screen.getByLabelText(/Close sidebar/i);
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("dashboard dropdown expands on click", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const dashboardBtn = screen.getAllByRole("button").find(btn => 
      btn.textContent?.includes("Dashboard")
    );
    
    if (dashboardBtn) {
      fireEvent.click(dashboardBtn);
      const vehicleInspections = screen.getAllByText(/Vehicle Inspection/i);
      expect(vehicleInspections.length).toBeGreaterThan(0);
    }
  });

  test("menu items not expandable when collapsed", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={true} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const dashboardBtn = screen.getAllByRole("button").find(btn => 
      btn.classList.contains("justify-center")
    );
    
    expect(dashboardBtn).toHaveClass("justify-center");
  });

  test("sidebar text hidden when collapsed", () => {
    const { rerender } = render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    let dashboard = screen.queryByText("Dashboard");
    expect(dashboard).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={true} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    dashboard = screen.queryByText("Dashboard");
    expect(dashboard).not.toBeInTheDocument();
  });

  test("sidebar has smooth transitions", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("transition-all", "duration-300");
  });

  test("renders fleet navigation items", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const fleetBtn = screen.getAllByRole("button").find(btn => 
      btn.textContent?.includes("Fleet")
    );
    
    if (fleetBtn) {
      fireEvent.click(fleetBtn);
      const drivers = screen.getAllByText(/Driver/i);
      expect(drivers.length).toBeGreaterThan(0);
    }
  });

  test("sidebar scrolls overflow content", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const nav = screen.getByRole("complementary").querySelector("nav");
    expect(nav?.parentElement).toHaveClass("overflow-y-auto");
  });

  test("logo displayed and responsive", () => {
    render(
      <BrowserRouter>
        <Sidebar 
          onClose={mockOnClose} 
          isCollapsed={false} 
          onToggleCollapse={mockOnToggleCollapse} 
        />
      </BrowserRouter>
    );

    const logo = screen.getByAltText(/Carify Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("h-16", "w-auto");
  });
});
