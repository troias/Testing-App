import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {};

const toppings = [
  { name: "Sprinkles", value: "Sprinkles" },
  { name: "Cherries", value: "Cherries" },
  { name: "Chocolate Sauce", value: "Chocolate Sauce" },
];

export default function IceCreamOrderForm({}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const checkBoxHandler = () => {
    setIsChecked(!isChecked);
  };

  const flavours = [
    { name: "Vanilla", value: "Vanilla" },
    { name: "Chocolate", value: "Chocolate" },
    { name: "Strawberry", value: "Strawberry" },
  ];

  return (
    <div className="w-full  mt-10 p-4 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{ name: "", iceCreamFlavor: [], toppings: [] }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          iceCreamFlavors: Yup.array()
            .min(1, "Pick at least 1 flavor")
            .required("Required"),
          toppings: Yup.array()
            .min(1, "Pick at least 1 topping")
            .required("Required"),
          confirmationCheckbox: Yup.boolean().oneOf(
            [true],
            "You must accept the terms and conditions"
          ),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
            setIsChecked(false);
          }, 3000);
        }}
      >
        {({ isSubmitting }) => (
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
                Ice Cream Flavor
              </label>
              <div role="group">
                {flavours.map((flavor) => (
                  <label key={flavor.value} className="mr-4">
                    <Field
                      type="checkbox"
                      name="iceCreamFlavors"
                      value={flavor.value}
                      className="mr-2"
                    />
                    {flavor.name}
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="iceCreamFlavors"
                component="div"
                className="text-red-500"
              />
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
                    {topping.name}
                  </label>
                ))}
              </div>
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
