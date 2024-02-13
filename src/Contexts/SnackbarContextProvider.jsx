import React, { useState } from "react";

import SnackbarContext from "./SnackbarContext";

const SnackbarContextProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarShow = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
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
      <SnackbarContext.Provider value={ contextValue }>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export default SnackbarContextProvider;
