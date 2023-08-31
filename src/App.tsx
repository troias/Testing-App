import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(false);

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="container mx-auto">
      <header className="text-center p-5">
        <img src={logo} className="mx-auto" alt="logo" />
        <p className="text-lg mt-5 py-6">Welcome to our nice home page!</p>
        <div className="flex justify-center">
          <input
            type="checkbox"
            id="disable-button-checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="ml-2" htmlFor="disable-button-checkbox">
            disable button
          </label>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={classNames(
            checked
              ? "bg-gray-400 cursor-not-allowed"
              : open
              ? "bg-violet-500 hover:bg-blue-700"
              : "bg-sky-500 hover:bg-red-700",
            "text-white font-bold py-2 px-4 rounded-full"
          )}
          disabled={checked}
        >
          {open ? "Open" : "Close"}
        </button>
      </header>
    </div>
  );
}

export default App;
