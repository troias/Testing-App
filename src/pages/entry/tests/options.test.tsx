import { render, screen } from "@testing-library/react";
import Options from "../options";

//Test 1: Displays image for each scoop option from server

test("Displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find scoop images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map(
    (element) => (element as HTMLImageElement).alt
  );
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

//Test 2: Displays image for each topping option from server

test("Displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  //find topping images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  //confirm alt text of images
  const altText = toppingImages.map(
    (element) => (element as HTMLImageElement).alt
  );
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
