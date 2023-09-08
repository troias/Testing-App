import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";

type Props = {};

const toppings = [
  { name: "Sprinkles", value: "Sprinkles" },
  { name: "Cherries", value: "Cherries" },
  { name: "Chocolate Sauce", value: "Chocolate Sauce" },
];

type Flavor = {
  name: string;
  value: string;
  scoops: number;
};

export default function IceCreamOrderForm({}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const checkBoxHandler = () => {
    setIsChecked(!isChecked);
  };

  const flavours: Flavor[] = [
    { name: "Vanilla", value: "Vanilla", scoops: 0 },
    { name: "Chocolate", value: "Chocolate", scoops: 0 },
    { name: "Strawberry", value: "Strawberry", scoops: 0 },
  ];

  // Initialize the iceCreamFlavors array with the correct structure
  const initialIceCreamFlavors = flavours.map((flavor) => ({
    ...flavor,
    scoops: 0,
  }));

  return (
    <div className="w-full  mt-10 p-4 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          name: "",
          iceCreamFlavors: initialIceCreamFlavors,
          toppings: [],
          confirmationCheckbox: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          toppings: Yup.array().min(1, "You must choose at least 1 topping"),
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
          console.log(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
                Ice Cream Flavor
              </label>
              {flavours.map((flavor) => (
                <div key={flavor.value} className="flex items-center">
                  <label className="mr-4">{flavor.name}</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    name={`iceCreamFlavors.${flavours.indexOf(flavor)}.scoops`}
                    value={
                      values.iceCreamFlavors[flavours.indexOf(flavor)].scoops
                    }
                    onChange={(e) =>
                      setFieldValue(
                        `iceCreamFlavors.${flavours.indexOf(flavor)}.scoops`,
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="mr-2 w-16 px-2 py-1 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
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
