import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { VscDebugStart } from "react-icons/vsc";
import { IoIosPause } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { FaRegStopCircle, FaQuestion } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ThemeContext from "../../Contexts/ThemeContext";

export const Timer = () => {
  const { theme } = useContext(ThemeContext);
  const btnColor = theme === "Light" ? "btnLightTheme" : "btnDarkTheme";
  const [timer, setTimer] = useState(0);
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [isTimerAvailable, setIsTimerAvailable] = useState(false);
  const defaultTimerSound = {
    index: 1,
    name: "classic-alarm",
    src: "classic-alarm.wav",
  };
  const storedTimerSound = localStorage.getItem("timerSound")
    ? localStorage.getItem("timerSound")
    : localStorage.setItem("timerSound", JSON.stringify(defaultTimerSound));

  const [timerSound, setTimerSound] = useState(JSON.parse(storedTimerSound));
  const [audio, setAudio] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const formatTime = (time) => {
    const absoluteTime = Math.abs(time);
    const seconds = Math.floor(absoluteTime / 1000) % 60;
    const minutes = Math.floor(absoluteTime / (1000 * 60)) % 60;
    const hours = Math.floor(absoluteTime / (1000 * 60 * 60)) % 24;
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };
  const addMins = (minutes) => {
    setIsTimerAvailable(true);
    setTimer((prev) => prev + minutes * 60000);
  };
  const handleToggleStopwatch = () => {
    setIsActiveTimer(!isActiveTimer);
  };
  const resetTimer = () => {
    setTimer(0);
    setIsTimerAvailable(false);
    setIsActiveTimer(false);
    setAudioPlaying(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    const storedTimerSound = localStorage.getItem("timerSound");
    setTimerSound(JSON.parse(storedTimerSound));
  }, [localStorage.getItem("timerSound")]);

  useEffect(() => {
    if (isActiveTimer) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1000);
      }, 1000);

      if (timer <= 0 && !isAudioPlaying) {
        const newAudio = new Audio(`Sounds/${timerSound.src}`);
        setAudio(newAudio);

        newAudio.addEventListener("ended", () => {
          const newTimeoutId = setTimeout(() => {
            newAudio.pause();
            newAudio.currentTime = 0;
            setAudio(null);
            setAudioPlaying(false);
          }, 1000);
          setTimeoutId(newTimeoutId);
        });

        setAudioPlaying(true);
        newAudio.play();
      }

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isActiveTimer, timer, timerSound, timeoutId, isAudioPlaying]);

  return (
    <>
      <div className="questionMark">
        <Tooltip
          title="To Change Timer Sound Go To Settings"
          placement="top"
          style={{ color: "yellow" }}
          arrow
        >
          <IconButton>
            <FaQuestion size={15} />
          </IconButton>
        </Tooltip>
      </div>
      <div className="clockSubModulesContainer mb-2">
        <div className="clockSubModules mb-4">
          <div className={timer < 0 ? "blink" : ""}>
            {timer < 0 ? `- ${formatTime(Math.abs(timer))}` : formatTime(timer)}
          </div>
        </div>
        <div className="d-flex w-100 justify-content-evenly">
          {isTimerAvailable && (
            <>
              <div
                className="clockSubModulesIcons"
                onClick={handleToggleStopwatch}
              >
                {timer > 0 ? (
                  isActiveTimer ? (
                    <IoIosPause size={30} className="cursorPointer" />
                  ) : (
                    <VscDebugStart size={30} className="cursorPointer" />
                  )
                ) : (
                  <FaRegStopCircle
                    size={30}
                    className="cursorPointer"
                    onClick={resetTimer}
                  />
                )}
              </div>
              <GrPowerReset
                className="clockSubModulesIcons cursorPointer"
                onClick={resetTimer}
                size={30}
              />
            </>
          )}
        </div>
        <div>
          <button
            className={`btn me-2 my-2 btn-outline-secondary ${btnColor}`}
            onClick={() => addMins(0.5)}
          >
            +30 sec
          </button>
          <button
            className={`btn me-2 my-2 btn-outline-secondary ${btnColor}`}
            onClick={() => addMins(1)}
          >
            +1 Min
          </button>
          <button
            className={`btn me-2 my-2 btn-outline-secondary ${btnColor}`}
            onClick={() => addMins(5)}
          >
            +5 Min
          </button>
          <button
            className={`btn me-2 my-2 btn-outline-secondary ${btnColor}`}
            onClick={() => addMins(10)}
          >
            +10 Min
          </button>
        </div>
      </div>
    </>
  );
};
