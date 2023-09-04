import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {};

export default function IceCreamOrderForm({}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const checkBoxHandler = () => {
    setIsChecked(!isChecked);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    iceCreamFlavor: Yup.string().required("Ice Cream Flavor is required"),
    toppings: Yup.array()
      .min(1, "Select at least one topping")
      .required("Toppings are required"),
  });

  return (
    <div className="w-full  mt-10 p-4 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{ name: "", iceCreamFlavor: "", toppings: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);

          console.log(values);
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
              <label className="block text-gray-700" htmlFor="iceCreamFlavor">
                Ice Cream Flavor
              </label>
              <Field
                type="text"
                name="iceCreamFlavor"
                id="iceCreamFlavor"
                className="block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Ice Cream Flavor"
              />
              <ErrorMessage
                name="iceCreamFlavor"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 py-4">Toppings</label>
              <div role="group">
                <label className="mr-4">
                  <Field
                    type="checkbox"
                    name="toppings"
                    value="Sprinkles"
                    className="mr-2"
                  />
                  <span>Sprinkles</span>
                </label>
                <label className="mr-4">
                  <Field
                    type="checkbox"
                    name="toppings"
                    value="Cherries"
                    className="mr-2"
                  />
                  Cherries
                </label>
                <label className="mr-4">
                  <Field
                    type="checkbox"
                    name="toppings"
                    value="Chocolate Sauce"
                    className="mr-2"
                  />
                  Chocolate Sauce
                </label>
              </div>
              <div className="py-4">
                <label>
                  <Field
                    type="checkbox"
                    name="acceptTerms"
                    checked={isChecked}
                    className="mr-2"
                    onClick={checkBoxHandler}
                  />
                  Accept Terms and Conditions
                </label>
              </div>
              <ErrorMessage
                name="toppings"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                } ${
                  !isChecked
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                }
                  
                `}
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
