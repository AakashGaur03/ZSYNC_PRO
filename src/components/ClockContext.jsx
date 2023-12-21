// import { createContext, useContext, useState } from "react";

// const ClockContext = createContext();

// export const ClockProvider = ({ children }) => {
//   const [activeClock, setActiveClock] = useState(1);
//   const [selectedClock, setSelectedClock] = useState(1);

//   return (
//     <ClockContext.Provider
//       value={{ activeClock, setActiveClock, selectedClock, setSelectedClock }}
//     >
//       {children}
//     </ClockContext.Provider>
//   );
// };

// export const useClock = () => {
//   const context = useContext(ClockContext);
//   if (!context) {
//     throw new Error("useClock must be used within a ClockProvider");
//   }
//   return context;
// };
