import React from "react";
import { render, screen } from "@testing-library/react";
import { StoreProvider } from "../store/storeContext";
import IceCreamOrderForm from "../pages/summary/SummaryForm"; // Import your component to test
import { MemoryRouter } from "react-router-dom"; // Import from react-router-dom

import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

test("it displays 'Vanilla' label", () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <IceCreamOrderForm />
      </StoreProvider>
    </MemoryRouter>
  );

  const vanillaLabel = screen.getByText("Vanilla", { exact: false });
  expect(vanillaLabel).toBeInTheDocument();
});

test("check the total cost of scoops starts at $0.00", () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <IceCreamOrderForm />
      </StoreProvider>
    </MemoryRouter>
  );

  const totalCost = screen.getByText("Total Cost of Scoops: $ 0");
  expect(totalCost).toBeInTheDocument();
});

test("total cost of scoops updates when scoops change", async () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <IceCreamOrderForm />
      </StoreProvider>
    </MemoryRouter>
  );

  const totalCost = screen.queryByText(/Total Cost of Scoops: \$/i);
  expect(totalCost).toBeInTheDocument();

  const vanillaInput = screen.getByRole("spinbutton", { name: /Vanilla/i });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  expect(totalCost).toHaveTextContent("Total Cost of Scoops: $ 2");
});

test("check the total cost of toppings starts at $0.00", () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <IceCreamOrderForm />
      </StoreProvider>
    </MemoryRouter>
  );

  const totalCost = screen.getByText("Toppings total price: $ 0");
  expect(totalCost).toBeInTheDocument();
});

test("total cost of toppings updates when toppings change", async () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <IceCreamOrderForm />
      </StoreProvider>
    </MemoryRouter>
  );

  const totalCost = screen.queryByText(/Toppings total price: \$/i);
  expect(totalCost).toBeInTheDocument();

  const cherriesInput = screen.getByRole("checkbox", { name: /Cherries/i });
  await userEvent.click(cherriesInput);

  expect(totalCost).toHaveTextContent("Toppings total price: $ 0.5");
});
