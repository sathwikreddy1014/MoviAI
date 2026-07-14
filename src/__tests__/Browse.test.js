import { render, screen } from "@testing-library/react";
import Browse from "../Pages/Browse";

test("renders Browse component", () => {
  render(<Browse />);
  const browseText = screen.getByText(/browse/i);
  expect(browseText).toBeInTheDocument();
});
