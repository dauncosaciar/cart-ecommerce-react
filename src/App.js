import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const openToast = () => {
    toast("Este es mi toast!");
  };

  return (
    <div className="App">
      <button onClick={openToast}>Click</button>
      <ToastContainer />
    </div>
  );
}

export default App;
