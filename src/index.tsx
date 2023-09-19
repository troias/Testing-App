import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import MobileNavigation from "./components/navigation/mobileNavigation";
import OrderSummary from "./pages/summary/OrderSummary";
import CompletionPage from "./pages/summary/CompletionPage";
import SummaryForm from "./pages/summary/SummaryForm";
import { StoreProvider } from "../src/store/storeContext";

const routerInner = createBrowserRouter([
  { path: "/", element: <App /> },

  { path: "/summary-form", element: <SummaryForm /> },
  {
    path: "/order-summary",
    element: <OrderSummary />,
  },
  {
    path: "/order-confirmed",
    element: <CompletionPage />,
  },
  { path: "/:path*", element: <div>404</div> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <MobileNavigation />
      <Layout>
        <RouterProvider router={routerInner} />
      </Layout>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
