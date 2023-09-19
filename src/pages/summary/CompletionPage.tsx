import { useContext } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate } from "react-router-dom";

const CompletionPage = () => {
  const navigate = useNavigate();

  const { order, updateOrder } = useContext(StoreContext);

  console.log("order", order);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Order Confirmed</h1>
        <p className="text-gray-700 mb-4">Thank you for your order!</p>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CompletionPage;
