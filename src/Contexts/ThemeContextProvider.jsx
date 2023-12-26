import React, { useState,useEffect } from "react";

import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("ThemeMode")?localStorage.getItem("ThemeMode"):"Light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };
  localStorage.setItem("ThemeMode",theme)

  const handleStorageChange =(event)=>{
    if(event.key==="ThemeMode")
    {
      const updatedTheme=event.newValue
      setTheme(updatedTheme)
    }
  }

  useEffect(()=>{
    window.addEventListener("storage",handleStorageChange)

    return()=>{
      window.removeEventListener("storage",handleStorageChange)
    }
  },[setTheme])

  return (
    <ThemeContext.Provider value={{ theme ,setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
