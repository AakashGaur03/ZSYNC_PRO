import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeContextProvider from "./Contexts/ThemeContextProvider.jsx";
import ClockContextProvider from "./Contexts/ClockContextProvider.jsx";
import SnackbarContextProvider from "./Contexts/SnackbarContextProvider.jsx";
// import { ConfirmModalContextProvider,useConfirmModalContext } from './Contexts/ConfirmModalProvider.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClockContextProvider>
      <ThemeContextProvider>
        <SnackbarContextProvider>
          {/* <ConfirmModalContextProvider> */}
          <App />
          {/* </ConfirmModalContextProvider> */}
        </SnackbarContextProvider>
      </ThemeContextProvider>
    </ClockContextProvider>
  </React.StrictMode>
);