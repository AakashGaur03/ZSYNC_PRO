import React, { useState } from "react";
import ClockContext from "./ClockContext";

const ClockContextProvider = ({children}) => {
    // const [activeClock,setActiveClock]=useState("clock1")
    // const [activeClass,setActiveClass]=useState(null)
    const [activeClock,setActiveClock]=useState(localStorage.getItem("ClockName")?localStorage.getItem("ClockName"):"clock1")
    const [activeClass,setActiveClass]=useState(localStorage.getItem("activeClockID")?localStorage.getItem("activeClockID"):1)
    return(
        <ClockContext.Provider value={{activeClock,setActiveClock ,activeClass,setActiveClass}}>
            {children}
        </ClockContext.Provider>
    )
};

export default ClockContextProvider