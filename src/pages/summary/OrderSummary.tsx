import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function OrderSummary({}: Props) {
  const { order, updateOrder } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleConfirmOrder = () => {
    if (order) {
      updateOrder({
        ...order,
        status: "completed",
      });
      navigate("/order-confirmed");
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Order Summary
        </h2>
        <div className="mt-6 text-2xl font-medium text-gray-800">
          <h3 className="mt-6 flex text-2xl font-medium text-gray-800 gap-3">
            <span>Name: </span>
            <span>{order?.customer.name}</span>
          </h3>
        </div>
        <h3 className="mt-6 flex text-2xl font-medium text-gray-800 gap-3">
          <span>Scoops: </span>
          <span>
            {order?.iceCreamFlavors.reduce(
              (total, flavor) => total + flavor.scoops,
              0
            ) || 0}
          </span>
        </h3>
        <div className="">
          <h2 className="mt-6  text-3xl font-extrabold text-gray-900">
            Toppings
          </h2>
          <div className="mt-6 text-2xl font-medium text-gray-800">
            {order?.toppings.map((topping) => (
              <ul key={topping.id} className="list-disc px-6">
                <li>{topping.name}</li>
              </ul>
            ))}
          </div>
        </div>
        <div className="flex pt-4">
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
        <div className="py-4">
          <div className="py-2">
            <h3 className="text-2xl font-medium text-gray-800">
              Total Scoop Cost: ${order?.scoopTotalCost.toFixed(2) || 0}
            </h3>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-gray-800">
              Total Toppings Price: ${order?.toppingTotalCost.toFixed(2) || 0}
            </h3>
          </div>
        </div>
        <div>
          <button
            onClick={handleConfirmOrder}
            disabled={!isChecked}
            className={`py-2 px-4 rounded w-32 ${
              isChecked
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
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
