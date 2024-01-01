import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = () => {
    const [audio,setaudio] = useState(null) 
  const sounds = [
    {
      name: "alarm-tone",
      src: "alarm-tone.wav",
    },
    { name: "classic-alarm", src: "classic-alarm.wav" },
    { name: "classic-short-alarm", src: "classic-short-alarm.wav" },
    { name: "clock-alarm", src: "clock-alarm.mp3" },
    { name: "critical-alarm", src: "critical-alarm.wav" },
    { name: "emergency-alert-alarm", src: "emergency-alert-alarm.wav" },
    { name: "error-alarm", src: "error-alarm.mp3" },
    { name: "facility-alarm", src: "facility-alarm.wav" },
    { name: "rooster-alarm", src: "rooster-alarm.wav" },
    { name: "security-breach-alarm", src: "security-breach-alarm.wav" },
    { name: "simple-notification-alarm", src: "simple-notification-alarm.mp3" },
  ];

  const playAudio =(src)=>{
    if(audio)
    {
        audio.pause()
    }
    const newAudio = new Audio(`Sounds/${src}`)
    newAudio.play()
    setaudio(newAudio)
  }

  return (
    <>
        {sounds.map((sound,index)=>(
            <div style={{border:"2px solid black"}} key={index} onClick={()=> playAudio(sound.src)}>
                <p>{sound.name}</p>
            </div>
        ))}
    </>
  );
};

export default AudioPlayer;
