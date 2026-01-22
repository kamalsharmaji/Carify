import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "./Contact";

describe("Contact Page", () => {
  test("renders contact page header", () => {
    render(<Contact />);
    expect(screen.getByText(/Get in/i)).toBeInTheDocument();
    expect(screen.getByText(/Touch/i)).toBeInTheDocument();
  });

  test("renders contact form", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/How can we help you\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test("renders contact information", () => {
    render(<Contact />);
    expect(screen.getByText(/Call Us/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 8800 123 456/i)).toBeInTheDocument();
    expect(screen.getByText(/Email Us/i)).toBeInTheDocument();
    expect(screen.getByText(/support@carifybids.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Visit Office/i)).toBeInTheDocument();
    expect(screen.getByText(/DLF Cyber City, Gurgaon, India/i)).toBeInTheDocument();
  });
});
