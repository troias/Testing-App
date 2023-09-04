import { useState } from "react";

type Props = {};

const dummyToppings = [
  {
    name: "Cherries",
    imagePath: "/images/cherries.png",
  },
  {
    name: "M&Ms",
    imagePath: "/images/m-and-ms.png",
  },
  {
    name: "Hot fudge",
    imagePath: "/images/hot-fudge.png",
  },
];

export default function OrderSummary({}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    if (isChecked) {
      setShowAlert(true);
    }
  };
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Order Summary
        </h2>
        <h3 className="mt-6 flex text-2xl font-medium text-gray-800 gap-3">
          <span>Scoops: </span>
          <span>{1}</span>
        </h3>
        <div className="">
          <h2 className="mt-6  text-3xl font-extrabold text-gray-900">
            Toppings
          </h2>
          <div className="mt-6 text-2xl font-medium text-gray-800">
            {dummyToppings.map((topping) => (
              <ul key={topping.name} className="list-disc px-6">
                <li>{topping.name}</li>
              </ul>
            ))}
          </div>
        </div>
        <div className="flex py-12  ">
          <div>
            <label className="mb-4 flex gap-4 w-max">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-lg">Check this box</span>
            </label>
          </div>
        </div>
        <div>
          <button
            onClick={handleButtonClick}
            disabled={!isChecked}
            className={`py-2 px-4 rounded w-32 ${
              isChecked
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed hidden"
            } text-white`}
          >
            Click me
          </button>
          {showAlert && <div role="alert">Button clicked!</div>}
        </div>
      </div>
    </div>
  );
}
