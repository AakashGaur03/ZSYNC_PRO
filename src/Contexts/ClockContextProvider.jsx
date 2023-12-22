import React, { useState } from "react";
import ClockContext from "./ClockContext";

const ClockContextProvider = ({children}) => {
    const [activeClock,setActiveClock]=useState("clock1")
    return(
        <ClockContext.Provider value={{activeClock,setActiveClock}}>
            {children}
        </ClockContext.Provider>
    )
};

export default ClockContextProvider