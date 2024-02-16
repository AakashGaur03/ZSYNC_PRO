import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {ClockContextProvider,ThemeContextProvider,ToastContextProvider} from './Contexts'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClockContextProvider>
      <ThemeContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </ThemeContextProvider>
    </ClockContextProvider>
  </React.StrictMode>
);
