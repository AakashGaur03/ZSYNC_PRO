import React, { useState } from "react";
import ClockContext from "./ClockContext";

const ClockContextProvider = ({children}) => {
    const [activeClock,setActiveClock]=useState("clock1")
    const [activeClass,setActiveClass]=useState(null)
    return(
        <ClockContext.Provider value={{activeClock,setActiveClock ,activeClass,setActiveClass}}>
            {children}
        </ClockContext.Provider>
    )
};

export default ClockContextProvider