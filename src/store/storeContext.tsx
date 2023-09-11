import { ReactNode, createContext } from "react";
import PropTypes from "prop-types";

interface Flavor {
  name: string;
  value: string;
  scoops: number;
  price: number;
}

interface Topping {
  name: string;
  value: string;
  price: number;
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

interface Order {
  iceCreamFlavors: Flavor[];
  toppings: Topping[];
  customer: Customer;
  status: "pending" | "completed";
  calculateTotalCost: () => number;
  grandTotal: number;
}

interface IceCreamContext {
  flavors: Flavor[];
  toppings: Topping[];
  customer?: Customer;
  order?: Order;
}

export const iceCreamContext: IceCreamContext = {
  flavors: [
    { name: "Vanilla", value: "Vanilla", scoops: 0, price: 0 },
    { name: "Chocolate", value: "Chocolate", scoops: 0, price: 0 },
    { name: "Mint Chip", value: "Mint Chip", scoops: 0, price: 0 },
  ],
  toppings: [
    { name: "Sprinkles", value: "Sprinkles", price: 1 },
    { name: "Cherries", value: "Cherries", price: 0.5 },
    { name: "Chocolate Sauce", value: "Chocolate Sauce", price: 1.5 },
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
    iceCreamFlavors: [],
    toppings: [],
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    status: "pending",
    calculateTotalCost: () => 0,
    grandTotal: 0,
  },
};

export const StoreContext = createContext<IceCreamContext | undefined>(
  undefined
);

type StoreProviderProps = {
  children: ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={iceCreamContext}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
