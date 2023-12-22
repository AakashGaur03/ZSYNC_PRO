import React, { useContext } from "react";
import ClockData from "./ClockData";
import ClockContext from "../Contexts/ClockContext";
const Clock = () => {
  const { activeClock, setActiveClock } = useContext(ClockContext);
  return (
    <>
  <ClockData  Clock1={activeClock === "clock1"} Clock2={activeClock === "clock2"} />
    </>
  );
};

export default Clock;


