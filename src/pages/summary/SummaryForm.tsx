import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";

type Props = {};

const toppings = [
  { name: "Sprinkles", value: "Sprinkles", cost: 1 }, // Cost of each topping
  { name: "Cherries", value: "Cherries", cost: 0.5 },
  { name: "Chocolate Sauce", value: "Chocolate Sauce", cost: 1.5 },
];

type Flavor = {
  name: string;
  value: string;
  scoops: number;
};

export default function IceCreamOrderForm({}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [totalScoops, setTotalScoops] = useState<number[]>([]);

  const checkBoxHandler = () => {
    setIsChecked(!isChecked);
  };

  const scoopCost = 2; // Cost of each scoop

  const flavours: Flavor[] = [
    { name: "Vanilla", value: "Vanilla", scoops: 0 },
    { name: "Chocolate", value: "Chocolate", scoops: 0 },
    { name: "Mint Chip", value: "Mint Chip", scoops: 0 },
  ];

  // Initialize the iceCreamFlavors array with the correct structure
  const initialIceCreamFlavors = flavours.map((flavor) => ({
    ...flavor,
    scoops: 0,
  }));

  return (
    <div className="w-full mt-10 p-4 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          name: "",
          iceCreamFlavors: initialIceCreamFlavors,
          toppings: [],
          scoopTotalCost: 0,
          toppingTotalCost: 0,
          grandTotal: 0,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          toppings: Yup.array().of(Yup.string()),
          iceCreamFlavors: Yup.array()
            .of(
              Yup.object().shape({
                name: Yup.string().required("Flavor name is required"),
                value: Yup.string().required("Flavor value is required"),
                scoops: Yup.number()
                  .min(0, "At least 0 scoops")
                  .max(5, "At most 5 scoops")
                  .integer("Scoops must be an integer")
                  .required("Scoops are required"),
              })
            )
            .min(1, "You must choose at least 1 flavor"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Calculate scoop total cost
          const scoopTotalCost =
            totalScoops.reduce((a, b) => a + b, 0) * scoopCost;

          // Calculate topping total cost
          const toppingTotalCost = values.toppings.reduce(
            (total: number, topping: string) => {
              const selectedTopping = toppings.find((t) => t.value === topping);
              return total + (selectedTopping ? selectedTopping.cost : 0);
            },
            0
          );

          // Calculate grand total
          const grandTotal = scoopTotalCost + toppingTotalCost;

          // Update the values object with the calculated costs
          const updatedValues = {
            ...values,
            scoopTotalCost,
            toppingTotalCost,
            grandTotal,
          };

          console.log(updatedValues);
          setTimeout(() => {
            alert(JSON.stringify(updatedValues, null, 2));
            resetForm();
            setSubmitting(false);
            setIsChecked(false);
          }, 3000);
        }}
      >
        {({ isSubmitting, setFieldValue, values }: FormikValues) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>

              <Field
                type="text"
                name="name"
                id="name"
                className="block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Your Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 py-2 font-bold">
                Ice Cream Flavor & Scoops
              </label>
              {flavours.map((flavor, index) => (
                <div key={flavor.value} className="flex items-center">
                  <label className="mr-4">{flavor.name}</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name={`iceCreamFlavors.${index}.scoops`}
                    value={values.iceCreamFlavors[index].scoops}
                    onChange={(e) => {
                      setFieldValue(
                        `iceCreamFlavors.${index}.scoops`,
                        parseInt(e.target.value, 10) || 0
                      );

                      // Update the total scoops count for this flavor
                      const newTotalScoops = [...totalScoops];
                      newTotalScoops[index] = parseInt(e.target.value, 10) || 0;
                      setTotalScoops(newTotalScoops);
                    }}
                    className="mr-2 w-16 px-2 py-1 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
              <ErrorMessage
                name="iceCreamFlavors"
                component="div"
                className="text-red-500"
              />
              <div className="py-2 font-bold">
                Scoops Total for Each Flavor:
                {totalScoops.map((scoops, index) => (
                  <span key={index} className="ml-2">
                    {flavours[index].name}: {scoops}
                  </span>
                ))}
              </div>
              <div className="py-2 font-bold">
                Scoops Cost: $
                {totalScoops.reduce((a, b) => a + b, 0) * scoopCost}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 py-4 font-bold">
                Toppings
              </label>
              <div role="group">
                {toppings.map((topping) => (
                  <label key={topping.value} className="mr-4">
                    <Field
                      type="checkbox"
                      name="toppings"
                      value={topping.value}
                      className="mr-2"
                    />
                    {topping.name} (+${topping.cost})
                  </label>
                ))}
              </div>
            </div>
            <div className="py-2 font-bold">
              Toppings Cost: $
              {values.toppings.reduce((total: number, topping: string) => {
                const selectedTopping = toppings.find(
                  (t) => t.value === topping
                );
                return total + (selectedTopping ? selectedTopping.cost : 0);
              }, 0)}
            </div>
            <div className="py-2 font-bold">
              Total Cost: ${values.grandTotal}
            </div>
            <div>
              <label>
                <Field
                  type="checkbox"
                  name="confirmationCheckbox"
                  checked={isChecked}
                  onChange={checkBoxHandler}
                  className="mr-2"
                />
                I confirm that this site is not real.
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || !isChecked}
                className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                } ${
                  !isChecked
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                }`}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
