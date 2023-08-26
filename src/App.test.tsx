import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";



//test if hello world in page

// Button has bg-blue500 intial color 
test("Button has bg-blue500 initial color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveClass("bg-blue-500");
});


// Button has correct intial text

//Button turns Red when clicked

