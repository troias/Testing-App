import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { log } from "console";

//test if hello world in page

// Button has bg-blue500 intial color
test("Button has bg-blue500 initial color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveClass("bg-blue-500");
});

// get state that if button is clicked and state is false then bg-red-500

test("Button click toggles state, is blue intially then red", () => {
  const { getByText } = render(<App />);
  const button = getByText("Test Button");

  // Initially, the state should be true
  expect(button).toHaveClass("bg-blue-500");

  // Simulate a button click
  fireEvent.click(button);

  // After the click, the state should change, so the class should change
  expect(button).toHaveClass("bg-red-500");

  // Test if the button text changes
  expect(button).toHaveTextContent("Test Button");
});

//expect color button to be enabled

test("Button is enabled", () => {
  const { getByText } = render(<App />);
  const button = getByText("Test Button");
  expect(button).toBeEnabled();
});

//expect check box is unchecked intially

test("Checkbox is unchecked", () => {
  const { getByRole } = render(<App />);
  const checkbox = getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

//expect check box is checked after click

test("Checkbox is checked should be false", () => {
  const { getByRole } = render(<App />);
  const checkbox = getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

// check box is checked after click and is unchecked after second click

test("Checkbox is checked should be false", () => {
  const { getByRole } = render(<App />);
  const checkbox = getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
