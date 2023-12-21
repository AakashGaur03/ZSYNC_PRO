import React, { useEffect, useState } from "react";

const ClockData = ({ activeClock, setActiveClock }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [getSec, setGetSec] = useState(0);
  const [getmin, setGetMin] = useState(0);
  const [getHour, setGetHour] = useState(0);

  const formatTimeComponent = (component) => {
    return component < 10 ? `0${component}` : component;
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

  const handleActiveClock = (id) => {
    setActiveClock(id);
  };

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
      <div
        className={`position-relative align-self-center ${
          activeClock === 1 ? "activeClockClass" : ""
        }`}
        onClick={() => handleActiveClock(1)}
      >
        <img src="/Clock2.webp" alt="" className="clockInfo" />
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
      <div
        className={`d-inline-flex ${
          activeClock === 2 ? "activeClockClass" : ""
        }`}
        onClick={() => handleActiveClock(2)}
      >
        <div className="border hour">{hour} &nbsp;</div>
        <div className="border minute">{minute}&nbsp;</div>
        <div className="border second">{second}&nbsp;</div>
        <div className="border ampn">{ampm}&nbsp;</div>
      </div>
    </>
  );
};

export default ClockData;
