import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { VscDebugStart } from "react-icons/vsc";
import { IoIosPause } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { FaRegStopCircle,FaQuestion } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [isTimerAvailable, setIsTimerAvailable] = useState(false);
  const formatTime = (time) => {
    const absoluteTime = Math.abs(time);
    const seconds = Math.floor(absoluteTime / 1000) % 60;
    const minutes = Math.floor(absoluteTime / (1000 * 60)) % 60;
    const hours = Math.floor(absoluteTime / (1000 * 60 * 60)) % 24;
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };
  const addMins = (minutes) => {
    setIsTimerAvailable(true);
    setTimer((prev) => prev + minutes * 60000);
  };
  const handleToggleStopwatch = () => {
    setIsActiveTimer(!isActiveTimer);
  };
  const resetTimer = () => {
    setTimer(0);
    setIsTimerAvailable(false);
    setIsActiveTimer(false);
  };
  useEffect(() => {
    if (isActiveTimer) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1000);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  });
  return (
    <>
    <div className="questionMark">

     <Tooltip title="To Change Timer Sound Go To Settings" placement="top" style={{color:"yellow"}} arrow>
    <IconButton>
      <FaQuestion size={15}/>
      </IconButton>
      </Tooltip> 
    </div>
    <div className="clockSubModulesContainer mb-2">
      <div className="clockSubModules mb-4">
        <div className={timer < 0 ? "blink" : ""}>
          {timer < 0 ? `- ${formatTime(Math.abs(timer))}` : formatTime(timer)}
        </div>
      </div>
      <div className="d-flex w-100 justify-content-evenly">
        {isTimerAvailable && (
          <>
            <div
              className="clockSubModulesIcons"
              onClick={handleToggleStopwatch}
            >
              {timer > 0 ? (
                isActiveTimer ? (
                  <IoIosPause size={30} className="cursorPointer" />
                ) : (
                  <VscDebugStart size={30} className="cursorPointer" />
                )
              ) : (
                <FaRegStopCircle
                  size={30}
                  className="cursorPointer"
                  onClick={resetTimer}
                />
              )}
            </div>
            <GrPowerReset
              className="clockSubModulesIcons cursorPointer"
              onClick={resetTimer}
              size={30}
            />
          </>
        )}
      </div>
      <div>
        <Button className="" onClick={() => addMins(0.5)}>
          +30 sec
        </Button>
        <Button className="" onClick={() => addMins(1)}>
          +1 Min
        </Button>
        <Button className="" onClick={() => addMins(5)}>
          +5 Min
        </Button>
        <Button className="" onClick={() => addMins(10)}>
          +10 Min
        </Button>
      </div>
    </div>
    </>
  );
};
