import {useState} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [open, setOpen] = useState(true)


  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }


  

  return (
    <div className="container mx-auto">
      <header className="text-center p-5">
        <img src={logo} className="mx-auto" alt="logo" />
        <p className="text-lg mt-5 py-6">
          Welcome to our nice home page!
        </p>
        <button onClick={() => setOpen(!open)  }className={classNames(open ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded": "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded")  } >
 
        
          Test Button
        </button>
      </header>
    </div>

  );
}

export default App;
