import React, { useContext } from "react";
import ClockContext from "../Context/ClockContext";
import ClockData from "./ClockData";
const Clock = () => {
  const { activeClock, setActiveClock } = useContext(ClockContext);
  return (
    <>
      <div>Clock</div>
      <div>Active Clock: {activeClock}</div>
      {activeClock === 1 && 
        <div
        className={`position-relative align-self-center ${activeClock === 1 ? 'activeClockClass' : ''}`}
        onClick={() => handleClockClick(1)}
      >
        <img src="/Clock2.webp" alt="" className="clockInfo" />
        <div
          className="position-absolute"
          id="secHand"
          style={{ transform: `rotate(${ClockData.secondRotateDegrees}deg)` }}
        ></div>
        <div
          className="position-absolute"
          id="minHand"
          style={{ transform: `rotate(${ClockData.minuteRotateDegrees}deg)` }}
        ></div>
        <div
          className="position-absolute"
          id="hourHand"
          style={{ transform: `rotate(${ClockData.hourRotateDegrees}deg)` }}
        ></div>
      </div>}

      {activeClock===2 && <div className={`d-inline-flex ${activeClock===2?'activeClockClass':''}`} onClick={() => handleClockClick(2)}>
        <div className="border hour">{ClockData.hour} &nbsp;</div>
        <div className="border minute">{ClockData.minute}&nbsp;</div>
        <div className="border second">{ClockData.second}&nbsp;</div>
        <div className="border ampn">{ClockData.ampm}&nbsp;</div>
      </div>}

      
    </>
  );
};

export default Clock;
