import { render, screen } from "@testing-library/react";
import OrderSummary from "./OrderSummary";
import UserEvent from "@testing-library/user-event";

//reate use instance

//test that checkbox is unchecked by default

test("Checkbox is unchecked by default", async () => {
  render(<OrderSummary />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

//test that clicking checkbox toggles it

test("Checkbox is checked when clicked", async () => {
  const user = UserEvent.setup();
  render(<OrderSummary />);
  const checkbox = screen.getByRole("checkbox");

  // Check the checkbox using user event
  await user.click(checkbox);

  // Verify that the checkbox is checked

  expect(checkbox).toBeChecked();
});

//test that button is disabled when checkbox is unchecked

test("Button is disabled when checkbox is unchecked", () => {
  render(<OrderSummary />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

//test that button is enabled when checkbox is checked

test("Button is enabled when checkbox is checked", async () => {
  const user = UserEvent.setup();
  render(<OrderSummary />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  await user.click(checkbox);
  expect(button).toBeEnabled();
});

//test that alert is displayed when button is clicked and checkbox is checked

test("Alert is displayed when button is clicked and checkbox is checked", async () => {
  const user = UserEvent.setup();
  render(<OrderSummary />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  await user.click(checkbox);
  await user.click(button);

  const alert = screen.getByRole("alert");
  expect(alert).toBeInTheDocument();
});
