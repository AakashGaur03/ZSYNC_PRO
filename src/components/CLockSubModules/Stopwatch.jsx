// import React, { useState } from 'react'
// import { Button } from 'react-bootstrap';

// const Stopwatch = () => {
//     // const a=0;
//     const [a,setA]=useState(0)
//     const add=()=>{
//         setInterval(() => {
//             setA(prev => prev +1)

//         }, 10);
//     }
//   return (
//     <>
//         <div>Stopwatch</div>
//         <div>{a}</div>
//         <Button onClick={add}/>
//     </>
//   )
// }

// export default Stopwatch

import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef()
  const formatTime = (time) => {
    const miliSeconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60)) % 60;

    const formatNumber=(num)=>(num<10 ? `0${num}`:num)
    const formattedMilliseconds =formatNumber(Math.floor(miliSeconds/10))

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}:${formattedMilliseconds}`
  };
  const handleStartStopwatch = () => {
    intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev+10)
    }, 10);
  };
  const handleStopStopwatch = () => {
    clearInterval(intervalRef.current)
  };
  const handleResetStopwatch = () => {
    clearInterval(intervalRef.current)
    setElapsedTime(0)
  };
  return (
    <>
      <div>Stopwatch</div>
      <div>{formatTime(elapsedTime)}</div>
      <Button onClick={handleStartStopwatch}>Start</Button>
      <Button onClick={handleStopStopwatch}>Stop</Button>
      <Button onClick={handleResetStopwatch}>Reset</Button>
    </>
  );
};

export default Stopwatch;
