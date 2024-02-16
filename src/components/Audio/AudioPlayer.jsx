import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const AudioPlayer = ({
  handleRadioChange,
  selectedSound,
  setSelectedSound,
  sounds,
}) => {
  const [audio, setaudio] = useState(null);

  const selectedSoundLocal = localStorage.getItem("timerSound")
    ? localStorage.getItem("timerSound")
    : localStorage.setItem(
        "timerSound",
        JSON.stringify({
          index: 1,
          name: "classic-alarm",
          src: "classic-alarm.wav",
        })
      );

  const parsedSound = JSON.parse(selectedSoundLocal);
  // console.log(parsedSound["index"]);

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
      <div className="d-flex justify-content-around mb-4"></div>

      <div className="mb-4 text-center">
        <h4>Timer Sounds</h4>
      </div>

      <Row>
        {sounds.map((sound, index) => (
          <Col
            lg="4"
            key={index}
            className="d-flex justify-content-between cursorPointer"
          >
            <div
              className="w-100"
              onClick={() => {
                playAudio(sound.src);
                handleRadioChange(index);
              }}
            >
              <p>{sound.name}</p>
            </div>
            <Form.Check
              name="playAudio"
              type="radio"
              checked={
                selectedSound ? selectedSound === index : parsedSound["index"]
              }
              onChange={() => {
                playAudio(sound.src);
                handleRadioChange(index);
              }}
              className="me-3"
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AudioPlayer;
