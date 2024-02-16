import React, { useState, useEffect } from "react";
import ClockContext from "./ClockContext";

const ClockContextProvider = ({ children }) => {
  const [activeClock, setActiveClock] = useState(
    localStorage.getItem("ClockName")
      ? localStorage.getItem("ClockName")
      : "clock1"
  );
  const [activeClass, setActiveClass] = useState(
    localStorage.getItem("ClockID") ? localStorage.getItem("ClockID") : 1
  );

  const [alarmActiveApp,setAlarmActiveApp]=useState(true)

  const handleStorageChange = (event) => {
    if (event.key === "ClockName") {
      const updatedClock = event.newValue;
      setActiveClock(updatedClock);
    } else if (event.key === "ClockID") {
      const updatedClockID = event.newValue;
      setActiveClass(updatedClockID);
    }
  };
  
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setActiveClass, setActiveClock]);
  return (
    <ClockContext.Provider
      value={{ activeClock, setActiveClock, activeClass, setActiveClass,alarmActiveApp,setAlarmActiveApp }}
    >
      {children}
    </ClockContext.Provider>
  );
};

export default ClockContextProvider;
