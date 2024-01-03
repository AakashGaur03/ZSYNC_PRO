import React, { useState } from "react";
import { Row, Col ,Form,Button} from "react-bootstrap";

const AudioPlayer = ({currentSound ,setCurrentSound,handleRadioChange,selectedSound,setSelectedSound}) => {
  const [audio, setaudio] = useState(null);

  // Local Storage 
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

  const playAudio = (src) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(`Sounds/${src}`);
    newAudio.play();
    setaudio(newAudio);
  };


  return (
    <>
    <div className="d-flex justify-content-around mb-4">
    <Button variant="secondary" onClick={()=>setCurrentSound("Timer")}>Timer</Button>
    <Button variant="secondary" onClick={()=>setCurrentSound("Stopwatch")}>Stopwatch</Button>
    </div>

    {currentSound==="Timer" ?
    <div className="mb-4 text-center">Set Timer Sounds</div> :
    <div className="mb-4 text-center">Set Stopwatch Sounds</div>
  }
      <Row>
        {sounds.map((sound, index) => (
          <Col lg="4" key={index} className="d-flex justify-content-between cursorPointer">
            <div className="w-100"
              onClick={() => {
                playAudio(sound.src)
                handleRadioChange(index);
              }}
            >
              <p>{sound.name}</p>
            </div>
              <Form.Check
              type="radio"
              checked={selectedSound===index}
              onChange={()=>{
                playAudio(sound.src)
                handleRadioChange(index)}}
              className="me-3"
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AudioPlayer;
