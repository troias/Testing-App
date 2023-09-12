import React from "react";
import { render, screen } from "@testing-library/react";
import StoreProvider from "../store/storeContext";
import IceCreamOrderForm from "../pages/summary/SummaryForm"; // Import your component to test

test("it displays 'Vanilla' label", () => {
  render(
    <StoreProvider>
      <IceCreamOrderForm />
    </StoreProvider>
  );

  const vanillaLabel = screen.getByText("Vanilla", { exact: false });
  expect(vanillaLabel).toBeInTheDocument();
});
