import React, { useContext, useState } from "react";
import ClockData from "./ClockData";
import ClockContext from "../Contexts/ClockContext";
import { FaStopwatch } from "react-icons/fa";
import { IoIosHourglass, IoIosAlarm } from "react-icons/io";
import Alarm from "./CLockSubModules/Alarm";
import Stopwatch from "./CLockSubModules/Stopwatch";
import { Timer } from "./CLockSubModules/Timer";
const Clock = () => {
  const { activeClock } = useContext(ClockContext);
  const [activeSubClockModule, setActiveSubClockModule] = useState(null);
  const handleClockSubModuleClick = (activeSubModule) => {
    setActiveSubClockModule(activeSubModule);
  };
  return (
    <>
      <ClockData
        parentComponent="Clock"
        Clock1={activeClock === "clock1"}
        Clock2={activeClock === "clock2"}
      />

      <FaStopwatch
        size={30}
        onClick={() => handleClockSubModuleClick("stopwatch")}
      />
      <IoIosHourglass
        size={30}
        onClick={() => handleClockSubModuleClick("timer")}
      />
      <IoIosAlarm
        size={30}
        onClick={() => handleClockSubModuleClick("alarm")}
      />
      {activeSubClockModule === "stopwatch" && <Stopwatch />}
      {activeSubClockModule === "timer" && <Timer />}
      {activeSubClockModule === "alarm" && <Alarm />}
    </>
  );
};

export default Clock;
