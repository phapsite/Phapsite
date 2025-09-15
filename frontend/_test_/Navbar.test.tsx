import { render, screen } from "@testing-library/react";
import Navbar from "../app/components/Navbar";

describe("Navbar", () => {
  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText(/Phapsite/i)).toBeInTheDocument();
  });
});