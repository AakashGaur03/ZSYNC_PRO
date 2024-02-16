import React, { useState } from "react";
import ToastContext from "./ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContextProvider = ({ children }) => {
  const [toastOptions, setToastOptions] = useState({});

  const showToast = (message,BGcolor="red",textColor="black" ,options = {}) => {
    const combinedOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      rtl: false,
      style:{backgroundColor:BGcolor , color:textColor},
      ...options,
    };
    toast(message, combinedOptions);
  };
  return (
    <>
      <ToastContext.Provider value={{showToast}}>
        {children}
        <ToastContainer className="mt-5" />
      </ToastContext.Provider>
    </>
  );
};

export default ToastContextProvider;
