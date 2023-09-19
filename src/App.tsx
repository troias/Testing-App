import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Ice Cream Shop!</h1>
        <p className="text-gray-700 mb-8">
          Enjoy our delicious ice cream flavors and toppings.
        </p>

        <Link
          to="/summary-form"
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 text-lg"
        >
          Order Ice Cream
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
