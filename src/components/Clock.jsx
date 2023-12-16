import React, { useEffect, useState } from 'react'

const Clock = () => {
  const [currentTime,setCurrentTime]=useState(new Date())
  
  useEffect(()=>{
    const intervalId =setInterval(()=>{
      setCurrentTime(new Date())
    },1000)


    return () => clearInterval(intervalId)
  },[])

  const formattedTime=currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const hour=currentTime.toLocaleTimeString([], {hour: '2-digit', hour12: false })
  const minute=currentTime.toLocaleTimeString([], {minute: '2-digit'})
  const second=currentTime.toLocaleTimeString([], {second: '2-digit' })
  const ampm=currentTime.toLocaleTimeString([], {hour: 'numeric', hour12: true }).split(' ')[1]
  return (
    <>
    <div>Clock</div>
    <img src="/Clock.png" alt="" className='clockInfo' />
    <p>{formattedTime}</p>
    <p>{hour}</p>
    <p>{minute}</p>
    <p>{second}</p>
    <p>{ampm}</p>
    </>
  )
}

export default Clock