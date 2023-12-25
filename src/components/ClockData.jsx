import React, { useContext, useEffect, useState } from "react";
import ClockContext from "../Contexts/ClockContext";

const ClockData = ({Clock1 , Clock2 , parentComponent}) => {
  const borderClass = parentComponent === 'Clock' ? 'border-0' : 'activeClockDataClass';
  const [currentTime, setCurrentTime] = useState(new Date());
  const [getSec, setGetSec] = useState(0);
  const [getmin, setGetMin] = useState(0);
  const [getHour, setGetHour] = useState(0);

  const formatTimeComponent = (component) => {
    return component < 10 ? `0${component}` : component;
  };
  // const {activeClass,setActiveClass}=useContext(ClockContext)
  const activeClass=localStorage.getItem("activeClockID")?localStorage.getItem("activeClockID"):1
  // console.log(activeClass)

  const handleActiveClock=(id)=>{
    if (id !== activeClass) {
      localStorage.setItem("activeClockID",id);
    }
  }
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
    <div className={`ClockDataClass ${activeClass === 1 ? `${borderClass}` : ""}`} onClick={()=>handleActiveClock(1)}>
      {Clock1 && <div
        className={`position-relative align-self-center `}
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
      </div>}
    </div>

    <div className={`ClockDataClass ${activeClass === 2 ? `${borderClass}` : ""}`} onClick={()=>handleActiveClock(2)}>
      {Clock2 && <div
        className={`d-inline-flex `}
      >
        <div className="border hour">{hour} &nbsp;</div>
        <div className="border minute">{minute}&nbsp;</div>
        <div className="border second">{second}&nbsp;</div>
        <div className="border ampn">{ampm}&nbsp;</div>
      </div>}
    </div>
    </>
  );
};

export default ClockData;
