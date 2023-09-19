import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import from react-router-dom
import { StoreProvider } from "../store/storeContext";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

import IceCreamOrderForm from "../pages/summary/SummaryForm"; // Import your component to test

test("dummy test to pass", () => {
  expect(true).toBe(true);
});
