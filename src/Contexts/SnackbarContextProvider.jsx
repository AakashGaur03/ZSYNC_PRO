import React, { useEffect, useState } from "react";

import SnackbarContext from "./SnackbarContext";

const SnackbarContextProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const handleSnackbarShow = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage("");
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (snackbarMessage) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        document.getElementById("snackBarDiv").classList.remove("active");

      }
      document.getElementById("snackBarDiv").classList.remove("active");

      document.getElementById("snackBarDiv").classList.add("active");
      const id = setTimeout(() => {
        setSnackbarMessage("");
        document.getElementById("snackBarDiv").classList.remove("active");
      }, 3000);
      setTimeoutId(id);
    }
  }, [snackbarMessage]);

  const contextValue = {
    snackbarOpen,
    setSnackbarOpen,
    handleSnackbarClose,
    handleSnackbarShow,
    snackbarMessage,
    setSnackbarMessage,
  };
  return (
    <>
      <SnackbarContext.Provider value={contextValue}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export default SnackbarContextProvider;
