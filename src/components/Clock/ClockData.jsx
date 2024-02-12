import React, { useContext, useEffect, useState } from "react";
import ClockContext from "../../Contexts/ClockContext";

const ClockData = ({ Clock1, Clock2 ,Clock3, parentComponent }) => {
  const borderClass =
    parentComponent === "Clock" ? "border-0" : "activeClockDataClass";
  const [currentTime, setCurrentTime] = useState(new Date());
  const [getSec, setGetSec] = useState(0);
  const [getmin, setGetMin] = useState(0);
  const [getHour, setGetHour] = useState(0);

  const formatTimeComponent = (component) => {
    return component < 10 ? `0${component}` : component;
  };
  const { activeClass, setActiveClass } = useContext(ClockContext);

  const handleActiveClock = (id) => {
    if (id !== activeClass) {
      setActiveClass(id);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setGetSec(now.getSeconds());
      setGetMin(now.getMinutes());
      setGetHour(now.getHours());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const secondRotateDegrees = (360 / 60) * getSec;
  const minuteRotateDegrees = (360 / 60) * getmin;
  const hourRotateDegrees = (360 / 12) * (getHour % 12) + (30 / 60) * getHour;
  const hour = currentTime
    .toLocaleTimeString([], { hour: "2-digit", hour12: true })
    .split(" ")[0];
  const minute = formatTimeComponent(
    currentTime.toLocaleTimeString([], { minute: "2-digit" })
  );
  const second = formatTimeComponent(
    currentTime.toLocaleTimeString([], { second: "2-digit" })
  );
  const ampm = currentTime
    .toLocaleTimeString([], { hour: "numeric", hour12: true })
    .split(" ")[1];
  return (
    <>
      <div className="mainClockClass">
        <div
          className={`ClockDataClass ${
            activeClass == 1 ? `${borderClass}` : ""
          }`}
          onClick={() => handleActiveClock(1)}
        >
          {Clock1 && (
            <div className={`position-relative align-self-center `}>
              <img src="./Clock2.webp" alt="" className="clockInfo" />
              <div
                className="position-absolute"
                id="secHand"
                style={{ transform: `rotate(${secondRotateDegrees}deg)` }}
              ></div>
              <div
                className="position-absolute"
                id="minHand"
                style={{ transform: `rotate(${minuteRotateDegrees}deg)` }}
              ></div>
              <div
                className="position-absolute"
                id="hourHand"
                style={{ transform: `rotate(${hourRotateDegrees}deg)` }}
              ></div>
            </div>
          )}
        </div>

        <div
          className={`ClockDataClass ${
            activeClass == 2 ? `${borderClass}` : ""
          }`}
          onClick={() => handleActiveClock(2)}
        >
          {Clock2 && (
            <div className={`d-inline-flex `}>
              <div className="ClassClock2 border hour">{hour} &nbsp;</div>
              <div className="ClassClock2 border minute">{minute}&nbsp;</div>
              <div className="ClassClock2 border second">{second}&nbsp;</div>
              <div className="ClassClock2 border ampn">{ampm}&nbsp;</div>
            </div>
          )}
        </div>


        <div
          className={`ClockDataClass colorWhite ${
            activeClass == 3 ? `${borderClass}` : ""
          }`}
          onClick={() => handleActiveClock(3)}
        >
          {Clock3 && (
            <div className={`d-inline-flex `}>
              <div className="ClassClock3 border hour">{hour} &nbsp;</div>
              <div className="ClassClock3 border minute">{minute}&nbsp;</div>
              <div className="ClassClock3 border second">{second}&nbsp;</div>
              <div className="ClassClock3 border ampn">{ampm}&nbsp;</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClockData;
