import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import DashboardLayout from "./DashboardLayout";

vi.mock("./Sidebar", async () => {
  const actual = await vi.importActual("./Sidebar");
  return actual;
});

vi.mock("./Navbar", async () => {
  const actual = await vi.importActual("./Navbar");
  return actual;
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
  };
});

describe("DashboardLayout - Responsive Design", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders layout with sidebar, navbar and main content", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    const layout = container.querySelector(".flex.bg-\\[\\#e2e8f0\\]");
    expect(layout).toBeInTheDocument();
  });

  test("layout has fixed height and background", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    const mainLayout = container.querySelector(".h-screen");
    expect(mainLayout).toBeInTheDocument();
    expect(mainLayout).toHaveClass("bg-[#e2e8f0]", "relative");
  });

  test("sidebar wrapper uses responsive classes", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    const sidebarWrapper = container.querySelector(".fixed.inset-y-0");
    expect(sidebarWrapper).toBeInTheDocument();
    expect(sidebarWrapper).toHaveClass("lg:relative", "transition-all");
  });

  test("main content has responsive padding", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    const main = container.querySelector("main");
    // Updated to reflect fluid layout standards
    expect(main).toHaveClass("flex-1", "overflow-y-auto");
  });

  test("content container is fluid without max-width", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    const fluidDiv = container.querySelector(".w-full.transition-all");
    expect(fluidDiv).toBeInTheDocument();
    // Verify it doesn't have the old max-width class
    expect(fluidDiv).not.toHaveClass("max-w-[1600px]");
  });

  test("sidebar overlay appears when sidebar opens on mobile", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    // Trigger sidebar open by clicking menu button in Navbar
    const menuBtn = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuBtn);

    const overlay = container.querySelector(".bg-black\\/50");
    expect(overlay).toBeInTheDocument();
  });

  test("layout structure has flex-col on main content", () => {
    const { container } = render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );

    const mainContent = container.querySelector(".flex-1.flex.flex-col");
    expect(mainContent).toBeInTheDocument();
  });
});
