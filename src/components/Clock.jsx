import React, { useContext } from "react";
import ClockData from "./ClockData";
const Clock = () => {
  const clockName = localStorage.getItem("ClockName");
  console.log("ClockName from localStorage:", clockName);
  return (
    <>
  <ClockData parentComponent="Clock" Clock1={clockName === "clock1"} Clock2={clockName === "clock2"} />
    </>
  );
};

export default Clock;


