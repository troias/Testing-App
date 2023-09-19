import React, { ReactNode, createContext, useState } from "react";
import PropTypes from "prop-types";

interface Flavor {
  name: string;
  value: string;
  scoops: number;
  price: number;
  id: string;
}

export interface Topping {
  name: string;
  value: string;
  price: number;
  id: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  customer: Customer;
  iceCreamFlavors: Flavor[];
  toppings: Topping[];
  status: "inProgress" | "review" | "completed";
  scoopTotalCost: number;
  toppingTotalCost: number;
  grandTotal: number;
}

interface IceCreamContext {
  flavors: Flavor[];
  toppings: Topping[];
  customer?: Customer;
  order: Order | undefined; // Ensure order is defined in the context
  updateOrder: (updatedOrder: Order) => void;
}

const initialContext: IceCreamContext = {
  flavors: [
    { name: "Vanilla", value: "Vanilla", scoops: 0, price: 2, id: "1" },
    { name: "Chocolate", value: "Chocolate", scoops: 0, price: 2, id: "2" },
    { name: "Mint Chip", value: "Mint Chip", scoops: 0, price: 2, id: "3" },
  ],
  toppings: [
    { name: "Sprinkles", value: "Sprinkles", price: 1, id: "1" },
    { name: "Cherries", value: "Cherries", price: 0.5, id: "2" },
    { name: "Chocolate Sauce", value: "Chocolate Sauce", price: 1.5, id: "3" },
  ],
  customer: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  order: {
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    iceCreamFlavors: [],
    toppings: [],
    scoopTotalCost: 0,
    toppingTotalCost: 0,
    status: "inProgress",
    grandTotal: 0,
  },
  updateOrder: () => {
    throw new Error("updateOrder function not yet initialized");
  },
};

const StoreContext = createContext<IceCreamContext>(initialContext);

type StoreProviderProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [order, setOrder] = useState<Order | undefined>(initialContext.order);

  const contextValue: IceCreamContext = {
    ...initialContext,
    order,
    updateOrder: (updatedOrder: Order) => setOrder(updatedOrder),
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StoreProvider, StoreContext };
