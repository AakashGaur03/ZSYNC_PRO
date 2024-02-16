import React, { useContext, useState } from "react";
import { FaStopwatch } from "react-icons/fa";
import { IoIosHourglass, IoIosAlarm } from "react-icons/io";
import { ImCross } from "react-icons/im";

import { Timer, Stopwatch, Alarm, ClockData } from "../index";

import { ThemeContext, ClockContext } from "../../Contexts";

const Clock = () => {
  const { activeClock, setAlarmActiveApp } = useContext(ClockContext);
  const [activeSubClockModule, setActiveSubClockModule] = useState(null);
  const handleClockSubModuleClick = (activeSubModule) => {
    if (activeSubModule === "alarm") {
      setAlarmActiveApp(false);
    } else {
      setAlarmActiveApp(true);
    }
    setActiveSubClockModule(activeSubModule);
  };
  const { theme } = useContext(ThemeContext);
  const iconColor = theme === "Light" ? "colorWhite" : "";
  return (
    <>
      <ClockData
        parentComponent="Clock"
        Clock1={activeClock === "clock1"}
        Clock2={activeClock === "clock2"}
        Clock3={activeClock === "clock3"}
      />
      <div className="d-flex justify-content-around mb-4">
        <FaStopwatch
          className={`cursorPointer ${iconColor}`}
          size={30}
          onClick={() => handleClockSubModuleClick("stopwatch")}
        />
        <IoIosHourglass
          className={`cursorPointer ${iconColor}`}
          size={30}
          onClick={() => handleClockSubModuleClick("timer")}
        />
        <IoIosAlarm
          size={30}
          className={`cursorPointer ${iconColor}`}
          onClick={() => handleClockSubModuleClick("alarm")}
        />
        <ImCross
          className={`cursorPointer ${iconColor}`}
          size={25}
          onClick={() => handleClockSubModuleClick("Cross")}
        />
      </div>

      {activeSubClockModule === "stopwatch" && <Stopwatch />}
      {activeSubClockModule === "timer" && <Timer />}
      {activeSubClockModule === "alarm" && <Alarm />}
    </>
  );
};

export default Clock;
