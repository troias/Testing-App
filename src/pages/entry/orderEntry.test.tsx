import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import OrderEntry from "./orderEntry";

// Test 1: Handles error for scoops route

test("Handles error for scoops route", async () => {
  // Mock the server response for /scoops
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ error: "Internal Server Error" }) // Provide a JSON response
      );
    })
  );
  // Render OrderEntry
  render(<OrderEntry />);

  // Wait for the component to finish rendering and for the error message to appear
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(
      "An unexpected error occurred. Please try again later."
    );
  });

  // Expect alert to show
  expect(screen.getByRole("alert")).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );

  // Remove mock to ensure test isolation
  server.resetHandlers();
});
