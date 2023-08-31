import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { log } from "console";
import { replaceCamelWithSpaces } from "./App";

//test if hello world in page

// Button has bg-blue500 intial color
test("Button has bg-blue500 initial color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveClass("bg-violet-500");
});

// get state that if button is clicked and state is false then bg-red-500

test("Button click toggles state, is blue intially then red", () => {
  const { getByText } = render(<App />);
  const button = getByText("Open");

  // Initially, the state should be true
  expect(button).toHaveClass("bg-violet-500");

  // Simulate a button click
  fireEvent.click(button);

  // After the click, the state should change, so the class should change
  expect(button).toHaveClass("bg-sky-500");

  // Test if the button text changes
  expect(button).toHaveTextContent("Close");
});

//expect color button to be enabled

test("Button is enabled", () => {
  const { getByText } = render(<App />);
  const button = getByText("Open");
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

// expect when disable is checked button to be bg-gray-400 and when button is !open be red and open be blue and when button is open be text open and when not open be close

test("Button is disabled when checkbox is checked", () => {
  const { getByText, getByRole } = render(<App />);
  const button = getByText("Open");
  const checkbox = getByRole("checkbox");

  // Initially, the button should be not enabled
  expect(button).toBeEnabled();

  // Simulate a checkbox click
  fireEvent.click(checkbox);

  // After the click, the button should be disabled
  expect(button).toBeDisabled();

  // Simulate another checkbox click
  fireEvent.click(checkbox);

  // After the click, the button should be enabled again
  expect(button).toBeEnabled();

  // button should be bg-gray-400 when checkbox is checked

  fireEvent.click(checkbox);

  expect(button).toHaveClass("bg-gray-400");
});

//descrive

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
