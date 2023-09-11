import { getByLabelText, render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import SummaryForm from "../../src/pages/summary/SummaryForm";

test("check if 'Vanilla' is associated with input", async () => {
  render(<SummaryForm />);

  const vanillaLabel = screen.getByText(/Vanilla/i); // Use a regular expression to match the label text
  expect(vanillaLabel).toBeInTheDocument();
});

// test if the input associated with the label is 0 by default

test("check if input associated with label is 0 by default", async () => {
  render(<SummaryForm />);

  const vanillaInput = await screen.getByRole("spinbutton", {
    name: /vanilla/i,
  });
  expect(vanillaInput).toHaveValue(0);
});

// update input when the user types in a new value

test("update input when the user types in a new value", async () => {
  render(<SummaryForm />);

  const vanillaInput = await screen.getByRole("spinbutton", {
    name: /vanilla/i,
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  expect(vanillaInput).toHaveValue(1);
});

// test if scoop button total starts at $0.00

test("test if scoop button total starts at $0.00", async () => {
  render(<SummaryForm />);

  const scoopTotal = await screen.getByText("Scoops total cost: $0");
  expect(scoopTotal).toBeInTheDocument();
});

// test if adding a scoop updates scoop total

test("test if adding a scoop updates scoop total", async () => {
  render(<SummaryForm />);

  const vanillaInput = await screen.getByRole("spinbutton", {
    name: /vanilla/i,
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  const scoopTotal = await screen.getByText("Scoops total cost: $2");
  expect(scoopTotal).toBeInTheDocument();
});
