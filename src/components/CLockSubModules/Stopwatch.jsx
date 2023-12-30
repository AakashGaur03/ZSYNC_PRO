import React, { useEffect, useRef, useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { IoIosPause } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { FaRegFlag } from "react-icons/fa";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [flagElapsedTime, setFlagElapsedTime] = useState(0);
  const [isActiveStopwatch, setIsActiveStopwatch] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [flagElapsedTimeArr, setFlagElapsedTimeArr] = useState([]);
  const intervalRef = useRef();
  const formatTime = (time) => {
    const miliSeconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60)) % 60;
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
    const formattedMilliseconds = formatNumber(Math.floor(miliSeconds / 10));

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}:${formattedMilliseconds}`;
  };

  useEffect(() => {
    if (isActiveStopwatch) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
        setFlagElapsedTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isActiveStopwatch]);
  const handleToggleStopwatch = () => {
    setIsActiveStopwatch(!isActiveStopwatch);
    setIsStopwatchStart(true);
  };
  const handleResetStopwatch = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setIsActiveStopwatch(false);
    setIsStopwatchStart(false);
    setFlagElapsedTime(0)
    setFlagElapsedTimeArr([]);
  };
  const flagTime = () => {
    console.log(formatTime(flagElapsedTime), formatTime(elapsedTime));
    setFlagElapsedTimeArr((prevFlagElapsedTimeArr) => [
      ...prevFlagElapsedTimeArr,
      { flagElapsedTime, elapsedTime },
    ]);
    console.log(flagElapsedTimeArr, " aaa");
    setFlagElapsedTime(0);
  };

  return (
    <div className="stopwatch-container mb-2">
      <div className="stopwatch mb-4">
        <span>{formatTime(elapsedTime)}</span>
      </div>
      <div className="d-flex w-100 justify-content-around">
        {isStopwatchStart && (
          <GrPowerReset
            className="stopwatchIcons"
            onClick={handleResetStopwatch}
            size={30}
          />
        )}
        <div className="stopwatchIcons" onClick={handleToggleStopwatch}>
          {isActiveStopwatch ? (
            <IoIosPause size={30} />
          ) : (
            <VscDebugStart size={30} />
          )}
        </div>
        {isStopwatchStart && (
          <FaRegFlag onClick={flagTime} className="stopwatchIcons" size={30} />
        )}
      </div>
      {flagElapsedTimeArr
        .slice()
        .reverse()
        .map((x, index) => (
          <div key={index} className="d-flex w-100 justify-content-around">
            <div>{flagElapsedTimeArr.length - index}</div>
            <div>{formatTime(x.flagElapsedTime)}</div>
            <div>{formatTime(x.elapsedTime)}</div>
          </div>
        ))}
    </div>
  );
};
export default Stopwatch;
