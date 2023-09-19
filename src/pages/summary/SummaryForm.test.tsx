import { render, screen } from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom"; // Import from react-router-dom

// check the confirm site is not real checkbox is unchecked by default

test("Checkbox is unchecked by default", async () => {
  render(
    <MemoryRouter>
      <SummaryForm />
    </MemoryRouter>
  );
  const confirmSiteCheckBox = screen.queryByText(
    /I confirm that this site is not real/i
  );
  expect(confirmSiteCheckBox).not.toBeChecked();
});

// check that clicking the checkbox toggles it

test("Checkbox is checked when clicked", async () => {
  const user = UserEvent.setup();
  render(
    <MemoryRouter>
      <SummaryForm />
    </MemoryRouter>
  );

  // Get the checkbox by its role
  const checkbox = screen.getByRole("checkbox", {
    name: /I confirm that this site is not real/i,
  });

  // Check the checkbox using user event

  await user.click(checkbox);

  // Verify that the checkbox is checked

  expect(checkbox).toBeChecked();
});

// when checkbox is unchecked, button is disabled

test("Button is disabled when checkbox is unchecked", async () => {
  render(
    <MemoryRouter>
      <SummaryForm />
    </MemoryRouter>
  );
  const button = screen.getByRole("button", { name: /Order Sundae/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /I confirm that this site is not real/i,
  });

  // Ensure the checkbox is initially unchecked
  expect(checkbox).not.toBeChecked();

  // Ensure the button is initially disabled
  expect(button).toBeDisabled();

  // Check the checkbox
  await UserEvent.click(checkbox);

  // Ensure the button is enabled after checking the checkbox
  expect(button).not.toBeDisabled();
});
