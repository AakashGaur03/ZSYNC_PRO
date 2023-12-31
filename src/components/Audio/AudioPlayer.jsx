import React, { useState } from "react";
import { Row, Col ,Form,Button} from "react-bootstrap";

const AudioPlayer = ({currentSound ,setCurrentSound,handleRadioChange,selectedSound,setSelectedSound,SetCurrentSoundParent,sounds}) => {
  const [audio, setaudio] = useState(null);

  // Local Storage 


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
    <Button variant="secondary" onClick={()=>SetCurrentSoundParent("Timer")}>Timer</Button>
    <Button variant="secondary" onClick={()=>SetCurrentSoundParent("Alarm")}>Alarm</Button>
    </div>

    {currentSound==="Timer" ?
    <div className="mb-4 text-center">Set Timer Sounds</div> :
    <div className="mb-4 text-center">Set Alarm Sounds</div>
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
