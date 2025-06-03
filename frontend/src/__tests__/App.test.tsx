import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders quiz title", () => {
  render(<App />);
  expect(screen.getByText(/start a trivia quiz/i)).toBeInTheDocument();
});
