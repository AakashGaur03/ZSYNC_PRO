// ClockData.jsx

import React, { useContext, useState, useEffect } from "react";
import ClockContext from "../Context/ClockContext";

const ClockData = () => {
  const { activeClock, setActiveClock } = useContext(ClockContext);

  const handleClockClick = (id) => {
    setActiveClock(id);
  };

  const getClockData = () => {
    const currentTime = new Date();
    const getSec = currentTime.getSeconds();
    const getMin = currentTime.getMinutes();
    const getHour = currentTime.getHours();

    const formatTimeComponent = (component) => {
      return component < 10 ? `0${component}` : component;
    };

    const secondRotateDegrees = (360 / 60) * getSec;
    const minuteRotateDegrees = (360 / 60) * getMin;
    const hourRotateDegrees = (360 / 12) * (getHour % 12) + (30 / 60) * getHour;
    const hour = currentTime
      .toLocaleTimeString([], { hour: "2-digit", hour12: true })
      .split(" ")[0];
    const minute = currentTime.toLocaleTimeString([], { minute: "2-digit" });
    const second = formatTimeComponent(
      currentTime.toLocaleTimeString([], { second: "2-digit" })
    );
    const ampm = currentTime
      .toLocaleTimeString([], { hour: "numeric", hour12: true })
      .split(" ")[1];

    return {
      secondRotateDegrees,
      minuteRotateDegrees,
      hourRotateDegrees,
      hour,
      minute,
      second,
      ampm,
    };
  };

  const clockData = getClockData();

  return (
    <>
      <div
        className={`position-relative align-self-center ${activeClock === 1 ? 'activeClockClass' : ''}`}
        onClick={() => handleClockClick(1)}
      >
        <img src="/Clock2.webp" alt="" className="clockInfo" />
        <div
          className="position-absolute"
          id="secHand"
          style={{ transform: `rotate(${clockData.secondRotateDegrees}deg)` }}
        ></div>
        <div
          className="position-absolute"
          id="minHand"
          style={{ transform: `rotate(${clockData.minuteRotateDegrees}deg)` }}
        ></div>
        <div
          className="position-absolute"
          id="hourHand"
          style={{ transform: `rotate(${clockData.hourRotateDegrees}deg)` }}
        ></div>
      </div>

      <div className={`d-inline-flex ${activeClock===2?'activeClockClass':''}`} onClick={() => handleClockClick(2)}>
        <div className="border hour">{clockData.hour} &nbsp;</div>
        <div className="border minute">{clockData.minute}&nbsp;</div>
        <div className="border second">{clockData.second}&nbsp;</div>
        <div className="border ampn">{clockData.ampm}&nbsp;</div>
      </div>
    </>
  );
};

export default ClockData;
