import { useState, useEffect } from "react";
import Options from "./options";

export default function OrderEntry() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3030/scoops")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((json) => {
        setItems(json);
      })
      .catch((error) => {
        setError(true); // Set error state if there's an error
      });
  }, []);

  return (
    <div>
      <h1>Order Sundae</h1>
      {error ? (
        <AlertBanner message="An unexpected error occurred. Please try again later." />
      ) : (
        <Options optionType="scoops" />
      )}
    </div>
  );
}

const AlertBanner = ({
  message,
  variant,
}: {
  message?: string;
  variant?: string;
}) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

const Alert = ({
  variant,
  style,
  children,
}: {
  variant: string;
  children: any;
  style: { backgroundColor: string };
}) => {
  return <div role="alert">{children}</div>;
};
