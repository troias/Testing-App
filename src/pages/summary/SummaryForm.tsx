import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import { StoreContext } from "../../store/storeContext";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../store/storeContext";
import type { Topping } from "../../store/storeContext";

const IceCreamOrderForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const ctx = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if ctx exists before destructuring its properties
  if (!ctx) {
    // Handle the case where ctx is undefined, such as providing default values or rendering an error message
    return (
      <div>
        Error: Unable to access store context.
        {/* You can provide additional error handling or fallback UI here */}
      </div>
    );
  }

  const { flavors, toppings, updateOrder } = ctx;

  const checkBoxHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full mt-10 p-4 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          name: "",
          iceCreamFlavors: flavors.map((flavor) => ({
            ...flavor,
            scoops: 0,
          })),
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
          const scoopTotalCost = values.iceCreamFlavors.reduce(
            (total, flavor) => total + flavor.scoops * flavor.price,
            0
          );

          // Calculate topping total cost
          const toppingTotalCost = values.toppings.reduce((total, topping) => {
            const selectedTopping = toppings.find((t) => t.value === topping);
            return total + (selectedTopping ? selectedTopping.price : 0);
          }, 0);

          // Calculate grand total
          const grandTotal = scoopTotalCost + toppingTotalCost;

          // Map selected toppings to match the Topping interface
          const mappedToppings: (Topping | null)[] = values.toppings.map(
            (selectedTopping, index) => {
              const selectedToppingInfo = toppings.find(
                (topping) => topping.value === selectedTopping
              );
              return selectedToppingInfo
                ? {
                    name: selectedToppingInfo.name,
                    value: selectedToppingInfo.value,
                    price: selectedToppingInfo.price,
                    id: index.toString(), // Assign a unique id for each topping
                  }
                : null;
            }
          );

          // Update the values object with the mapped toppings
          const updatedValues: Order = {
            customer: {
              name: values.name,
              email: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: "",
            },
            iceCreamFlavors: values.iceCreamFlavors,
            toppings: mappedToppings.filter(
              (topping) => topping !== null
            ) as Topping[],
            scoopTotalCost,
            toppingTotalCost,
            grandTotal,
            status: "review",
          };

          console.log("updatedValues", updatedValues);
          setTimeout(() => {
            // alert(JSON.stringify(updatedValues, null, 2));
            updateOrder(updatedValues);
            resetForm();
            setSubmitting(false);
            setIsChecked(false);
          }, 3000);
          navigate("/order-summary");
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
              {flavors.map((flavor, index) => (
                <div key={flavor.value} className="flex items-center">
                  <label
                    className="mr-4"
                    htmlFor={`iceCreamFlavors.${index}.scoops`}
                  >
                    {flavor.name}
                  </label>
                  <input
                    id={`iceCreamFlavors.${index}.scoops`}
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
                      // You may need to implement this part based on your specific requirements
                    }}
                    className="mr-2 w-16 px-2 py-1 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                  Ice Cream Flavour + Scoops Total Cost: $
                  {`$${values.iceCreamFlavors[index].scoops * flavor.price}`}
                  {
                    // Icecream flavour + scoops total cost
                  }
                </div>
              ))}
              <label className="block text-gray-700 py-4 font-bold ">
                Total Cost of Scoops: ${" "}
                {values.iceCreamFlavors.reduce(
                  (total: any, flavor: { scoops: any; price: any }) =>
                    total + flavor.scoops * flavor.price,
                  0
                )}
              </label>
              <label className="block text-gray-700 py-4 font-bold ">
                Total Scoops:{" "}
                {values.iceCreamFlavors.reduce(
                  (total: any, flavor: { scoops: any }) =>
                    total + flavor.scoops,
                  0
                )}
              </label>
              <ErrorMessage
                name="iceCreamFlavors"
                component="div"
                className="text-red-500"
              />
              {/* Add code here to display scoops total */}
            </div>
            <div>
              <label className="block text-gray-700 py-4 font-bold">
                Toppings
              </label>
              <div role="group">
                {toppings.map((topping) => (
                  <div key={topping.value}>
                    {" "}
                    {/* Add key here */}
                    <label className="mr-4">
                      <Field
                        id={`toppings.${topping.value}`}
                        type="checkbox"
                        name="toppings"
                        value={topping.value}
                        className="mr-2"
                      />
                      {topping.name} (+${topping.price})
                    </label>
                  </div>
                ))}
                <label className="block text-gray-700 py-4 font-bold">
                  Toppings total price: ${" "}
                  {values.toppings.reduce(
                    (total: number, selectedTopping: string) => {
                      const selectedToppingInfo = toppings.find(
                        (topping) => topping.value === selectedTopping
                      );
                      return (
                        total +
                        (selectedToppingInfo ? selectedToppingInfo.price : 0)
                      );
                    },
                    0
                  )}
                </label>
              </div>
            </div>
            <div className="py-2 font-bold">
              {/* Add code here to display toppings cost */}
            </div>
            <div className="py-2 font-bold">
              Total Cost: $
              {values.iceCreamFlavors.reduce(
                (total: any, flavor: { scoops: any; price: any }) =>
                  total + flavor.scoops * flavor.price,
                0
              ) +
                values.toppings.reduce(
                  (total: number, selectedTopping: string) => {
                    const selectedToppingInfo = toppings.find(
                      (topping) => topping.value === selectedTopping
                    );
                    return (
                      total +
                      (selectedToppingInfo ? selectedToppingInfo.price : 0)
                    );
                  },
                  0
                )}
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
};

export default IceCreamOrderForm;
