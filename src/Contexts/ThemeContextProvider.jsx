import React, { useState } from "react";

import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };
  return (
    <ThemeContext.Provider value={{ theme ,setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
