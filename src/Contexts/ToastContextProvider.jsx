import React, { useState } from "react";
import ToastContext from "./ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContextProvider = ({ children }) => {
  const [toastOptions, setToastOptions] = useState({});

  const showToast = (message, options = {}) => {
    const combinedOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      rtl: false,
      ...options,
    };
    toast(message, combinedOptions);
  };
  return (
    <>
      <ToastContext.Provider value={{showToast}}>
        {children}
        <ToastContainer />
      </ToastContext.Provider>
    </>
  );
};

export default ToastContextProvider;
