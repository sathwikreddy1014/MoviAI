import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renders Footer component", () => {
  render(<Footer />);
  const footerText = screen.getByText(/©|copyright|footer/i);
  expect(footerText).toBeInTheDocument();
});
