import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "../store/storeContext";
import userEvent from "@testing-library/user-event";
import App from "../App";
import IceCreamOrderForm from "../pages/summary/SummaryForm";
import SummaryPage from "../pages/summary/OrderSummary";
import OrderCompletion from "../pages/summary/CompletionPage";

const setupApp = () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </MemoryRouter>
  );
};

const setupIceCreamOrderForm = () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <IceCreamOrderForm />
      </StoreProvider>
    </MemoryRouter>
  );
};

const setupSummaryPage = () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <SummaryPage />
      </StoreProvider>
    </MemoryRouter>
  );
};

const setupOrderCompletion = () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <OrderCompletion />
      </StoreProvider>
    </MemoryRouter>
  );
};

const { unmount } = render(
  <MemoryRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </MemoryRouter>
);

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  // Render the app
  setupApp();

  // Render the order form page
  setupIceCreamOrderForm();

  // Add ice cream scoops and toppings
  const vanillaInput = screen.getByRole("spinbutton", { name: /Vanilla/i });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  const sprinklesCheckbox = screen.getByRole("checkbox", {
    name: /Sprinkles/i,
  });
  await userEvent.click(sprinklesCheckbox);

  // Order ice cream
  const orderButton = screen.getByRole("button", { name: /Order Sundae/i });
  await userEvent.click(orderButton);

  // Go to summary page
  setupSummaryPage();

  // Check summary information based on order

  // Check name in summary
  const name = screen.getByText(/Name:/i);
  expect(name).toBeInTheDocument();

  // Check scoops in summary only within the SummaryPage
  const scoops = screen.getByTestId("scoops-summary"); // Use getByTestId
  expect(scoops).toBeInTheDocument();

  // Click the checkbox to confirm the order
  const confirmCheckbox = screen.getByTestId("confirmation");
  await userEvent.click(confirmCheckbox);

  // Click the button to confirm order
  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  await userEvent.click(confirmOrderButton);

  // Go to order completion page

  setupOrderCompletion();

  // Check data on confirmation page

  // check order confirmed text on page

  const orderConfirmedText = screen.getByText(/Order Confirmed/i);
  expect(orderConfirmedText).toBeInTheDocument();

  // expect order number

  const orderNumber = screen.getByText(/Your order number is/i);
  expect(orderNumber).toBeInTheDocument();

  // Click back to home

  const backToHomeButton = screen.getByRole("button", {
    name: /back to home/i,
  });
  await userEvent.click(backToHomeButton);

  // check back at home page

  // unmount the app
});
