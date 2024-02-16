import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import { ToastContext, ThemeContext } from "../../Contexts";
const Alarm = () => {
  const { showToast } = useContext(ToastContext);

  const days = [
    { id: 1, day: "M" },
    { id: 2, day: "T" },
    { id: 3, day: "W" },
    { id: 4, day: "T" },
    { id: 5, day: "F" },
    { id: 6, day: "S" },
    { id: 7, day: "S" },
  ];
  const sounds = [
    { index: 0, name: "alarm-tone", src: "alarm-tone.wav" },
    { index: 1, name: "classic-alarm", src: "classic-alarm.wav" },
    { index: 2, name: "classic-short-alarm", src: "classic-short-alarm.wav" },
    { index: 3, name: "clock-alarm", src: "clock-alarm.mp3" },
    { index: 4, name: "critical-alarm", src: "critical-alarm.wav" },
    {
      index: 5,
      name: "emergency-alert-alarm",
      src: "emergency-alert-alarm.wav",
    },
    { index: 6, name: "error-alarm", src: "error-alarm.mp3" },
    { index: 7, name: "facility-alarm", src: "facility-alarm.wav" },
    { index: 8, name: "rooster-alarm", src: "rooster-alarm.wav" },
    {
      index: 9,
      name: "security-breach-alarm",
      src: "security-breach-alarm.wav",
    },
    {
      index: 10,
      name: "simple-notification-alarm",
      src: "simple-notification-alarm.mp3",
    },
  ];
  // const [activeDays, setActiveDays] = useState([]);
  // const handleAlarmClick = (dayId) => {
  //   if (activeDays.includes(dayId)) {
  //     setActiveDays(activeDays.filter((id) => id !== dayId));
  //   } else {
  //     setActiveDays([...activeDays, dayId]);
  //   }
  // };

  const storedAlarms = JSON.parse(localStorage.getItem("alarmData"))
    ? JSON.parse(localStorage.getItem("alarmData"))
    : [];

  const filteredActiveAlarms = storedAlarms.filter(
    (alarm) => alarm.status === true
  );
  // console.log(filteredActiveAlarms);

  const [allAlarm, setAllAlarm] = useState(storedAlarms);
  const [activeAlarms, setActiveAlarms] = useState(storedAlarms);

  useEffect(() => {
    const filteredActiveAlarms = storedAlarms.filter(
      (alarm) => alarm.status === true
    );

    setActiveAlarms(filteredActiveAlarms);
  }, [allAlarm]);
  useEffect(() => {
    const filteredActiveAlarms = storedAlarms.filter(
      (alarm) => alarm.status === true
    );

    localStorage.setItem("onAlarms", JSON.stringify(filteredActiveAlarms));
  }, [storedAlarms]);

  // const [isActiveAlarm, setIsActiveAlarm] = useState([false]);
  const [alarmTime, setAlarmTime] = useState(null);
  const toggleAlarmStatus = (Id) => {
    const updatedAlarm = allAlarm.map((alarm) =>
      alarm.uniqueId === Id ? { ...alarm, status: !alarm.status } : alarm
    );
    AlarmOnOrOff(Id);
    setAllAlarm(updatedAlarm);
  };

  const AlarmOnOrOff = (Id) => {
    const alarmToBeOn = allAlarm.find((alarm) => alarm.uniqueId === Id);

    if (alarmToBeOn && alarmToBeOn.status) {
      showToast("Alarm Turned Off");
      const { hours, minutes } = alarmToBeOn;

      let formattedHours;
      if (hours.includes("PM")) {
        formattedHours = (
          parseInt(hours) === 12 ? 12 : parseInt(hours) + 12
        ).toString();
      } else {
        formattedHours = parseInt(hours) === 12 ? "00" : hours.slice(0, 2);
      }
      const now = new Date();
      let alarmTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(formattedHours),
        parseInt(minutes),
        0
      );
      if (alarmTime <= now) {
        alarmTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1, // Setting it for the next day
          parseInt(formattedHours),
          parseInt(minutes),
          0
        );
      }
      // setIsActiveAlarm(true);
      setAlarmTime(alarmTime);

      const timeUnlitAlarm = alarmTime - now;

      if (timeUnlitAlarm < 0) {
        // console.log("Alarm Gone", alarmToBeOn);
      }

      // console.log(timeUnlitAlarm, "timeUnlitAlarm");
      // console.log(alarmTime, "alarmTime");
      // console.log(now, "now");

      // We can make new Date() in folllowing Manner
      // new Date();
      // new Date(date string)
      // new Date(year,month)
      // new Date(year,month,day)
      // new Date(year,month,day,hours)
      // new Date(year,month,day,hours,minutes)
      // new Date(year,month,day,hours,minutes,seconds)
      // new Date(year,month,day,hours,minutes,seconds,ms)

      // new Date(milliseconds)
    } else {
      showToast("Alarm Turned On", "green", "white");
    }
  };
  // useEffect(() => {
  //   if (isActiveAlarm) {
  //     const intervalId = setInterval(() => {
  //       console.log("timeticking");
  //       const now = new Date();
  //       const timeUntilAlarm = alarmTime - now;
  //       if (timeUntilAlarm < 0) {
  //         console.log("Alarm Gone");
  //         clearInterval(intervalId);
  //         setIsActiveAlarm(false);
  //       }
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [isActiveAlarm, alarmTime]);

  const [nextAlarm, setNextAlarm] = useState(null);

  const NextAlarmSetFunction = () => {
    let eachAlarm = localStorage.getItem("onAlarms")
      ? JSON.parse(localStorage.getItem("onAlarms"))
      : [];
    // console.log(eachAlarm, "dddd");
    if (eachAlarm.length > 0) {
      // console.log(eachAlarm, "ea");
      const sortAlarm = [];
      const now = new Date();
      for (let i = 0; i < eachAlarm.length; i++) {
        // eachAlarm - now
        // console.log(eachAlarm[i]);
        // console.log(eachAlarm[i].hours);

        let formattedHours;
        if (eachAlarm[i].hours.includes("PM")) {
          formattedHours = (
            parseInt(eachAlarm[i].hours) === 12
              ? 12
              : parseInt(eachAlarm[i].hours) + 12
          ).toString();
        } else {
          formattedHours =
            parseInt(eachAlarm[i].hours) === 12
              ? "00"
              : eachAlarm[i].hours.slice(0, 2);
        }
        const now = new Date();
        let alarmTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(formattedHours),
          parseInt(eachAlarm[i].minutes),
          0
        );
        if (alarmTime <= now) {
          alarmTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            parseInt(formattedHours),
            parseInt(eachAlarm[i].minutes),
            0
          );
        }
        const timeUnlitAlarm = alarmTime - now;
        // console.log(timeUnlitAlarm);
        sortAlarm.push({
          time: timeUnlitAlarm,
          alarm: alarmTime,
          soundIndex: eachAlarm[i].soundIndex,
        });
      }
      sortAlarm.sort((a, b) => a.time - b.time);
      // console.log(sortAlarm, "sorted");
      if (sortAlarm[0]) {
        setNextAlarm(sortAlarm[0]);
      }
    } else {
      setNextAlarm(null);
    }

    // console.log(nextAlarm, "nextAlarm");
  };
  useEffect(() => {
    NextAlarmSetFunction();
  }, [activeAlarms]);

  const pauseWhenRinOut = () => {
    document.getElementById("alarmRing").classList.remove("shake-image");
    NextAlarmSetFunction();
    handleAlarmModalRingClose();
  };

  const [timeRemaining, setTimeRemaining] = useState("");

  const playSound = (soundIndex) => {
    // console.log(soundIndex, "Index");
    // console.log(sounds);
    handleAlarmModalRingShow();
    let alarmRing = document.getElementById("alarmRing");
    if (alarmRing) {
      alarmRing.classList.add("shake-image");
    }
    const soundToBePlayed = sounds.find((sound) => sound.index == soundIndex);
    // console.log(soundToBePlayed.src, "dd");

    if (soundToBePlayed) {
      const audio = new Audio(`Sounds/${soundToBePlayed.src}`);
      audio.play();
    } else {
      console.error("Sound not found for index:", soundIndex);
    }
  };

  useEffect(() => {
    let timeRunOut = 0;
    if (nextAlarm) {
      const now = new Date();
      const intervalId = setInterval(() => {
        timeRunOut = nextAlarm.alarm - now;
        // console.log(timeRunOut);
        // console.log(nextAlarm);
        setTimeRemaining(timeRunOut);
        if (timeRunOut < 0) {
          // console.log("asfdsdf");
          playSound(nextAlarm.soundIndex);
        }
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [nextAlarm, timeRemaining]);

  useEffect(() => {
    const storedAlarm = localStorage.getItem("alarmData")
      ? JSON.parse(localStorage.getItem("alarmData"))
      : [];
    setAllAlarm(storedAlarm);
  }, []);
  useEffect(() => {
    localStorage.setItem("alarmData", JSON.stringify(allAlarm));
  }, [allAlarm]);
  const { theme } = useContext(ThemeContext);
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const btnColor = theme === "Light" ? "btnLightTheme" : "btnDarkTheme";
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [showAlarmModalRing, setShowAlarmModalRing] = useState(false);
  const handleAlarmModalClose = () => setShowAlarmModal(false);
  const handleAlarmModalShow = () => setShowAlarmModal(true);
  const handleAlarmModalRingClose = () => setShowAlarmModalRing(false);
  const handleAlarmModalRingShow = () => setShowAlarmModalRing(true);
  const handleAlarmModalUpdate = () => {
    let selectedMin = document.getElementById("minutes").value;
    let selectedHour = document.getElementById("hours").value;
    let selectedSound = document.getElementById("sounds").value;
    let selectedTitle = document.getElementById("title").value;

    const newAlarm = {
      uniqueId: Date.now(),
      hours: selectedHour,
      minutes: selectedMin,
      soundIndex: selectedSound,
      title: selectedTitle,
      status: true,
    };
    // setIsActiveAlarm(true);

    AlarmOnOrOff(newAlarm.uniqueId);
    setAllAlarm((prevAlarms) => {
      const updateAlarms = [...prevAlarms, newAlarm];
      updateAlarms.sort((a, b) => {
        // console.log(a.hours.slice(3, 5));
        if (a.hours.slice(3, 5) === "PM") {
          // console.log(parseInt(a.hours) + 12);
          // console.log(a.hours);
        }
        let aHours = parseInt(a.hours);
        let bHours = parseInt(b.hours);
        const adjustedAHours =
          a.hours.slice(3, 5) === "PM" ? aHours + 12 : aHours;
        const adjustedBHours =
          b.hours.slice(3, 5) === "PM" ? bHours + 12 : bHours;

        if (adjustedAHours !== adjustedBHours) {
          return adjustedAHours - adjustedBHours;
        }
        return parseInt(a.minutes) - parseInt(b.minutes);
      });
      // console.log(updateAlarms, "Update");
      localStorage.setItem("alarmData", JSON.stringify(updateAlarms));
      return updateAlarms;
    });

    setShowAlarmModal(false);
    showToast("Alarm Added Successfully", "green", "white");
  };
  const removeClock = (Id) => {
    const updatedClocks = allAlarm.filter((alarm) => alarm.uniqueId !== Id);
    document.getElementById(Id).classList.add("disintegrate");

    setTimeout(() => {
      setAllAlarm(updatedClocks);
    }, 1000);
    showToast("Alarm Deleted Successfully");

  };

  const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };
  const formatNumbers = (hour) => {
    return hour < 10 ? `0${hour}` : hour;
  };

  return (
    <div>
      {/* <div>Alarm</div> */}
      <div className="text-center">
        <Button
          variant="secondary"
          className={`${btnColor} my-3`}
          onClick={handleAlarmModalShow}
        >
          Set Alarm
        </Button>
      </div>

      <Modal
        show={showAlarmModal}
        onHide={handleAlarmModalClose}
        className="backgroundTransparent"
      >
        <Modal.Body
          className={`${modalBgColor} ${textColorClass} confirmBtn modalBorderRadiusAndShadow`}
        >
          <h3 className="text-center mb-3">Set Alarm</h3>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="hours">Hours</label>
              <div>
                <select
                  id="hours"
                  className={`${modalBgColor} ${textColorClass} alarmSelectBox`}
                >
                  {generateOptions(1, 12).map((hour) => (
                    <option
                      className="colorDropdownAlarm"
                      key={`hour-${hour}`}
                      value={`${formatNumbers(hour)} AM`}
                    >
                      {formatNumbers(hour)} AM
                    </option>
                  ))}
                  {generateOptions(1, 12).map((hour) => (
                    <option
                      className="colorDropdownAlarm"
                      key={`hour-${hour + 12}`}
                      value={`${formatNumbers(hour)} PM`}
                    >
                      {formatNumbers(hour)} PM
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="minutes">Minutes</label>
              <div>
                <select
                  id="minutes"
                  className={`${modalBgColor} ${textColorClass} alarmSelectBox`}
                >
                  {generateOptions(0, 59).map((minute) => (
                    <option
                      className="colorDropdownAlarm"
                      key={`minute-${minute}`}
                      value={`${formatNumbers(minute)}`}
                    >
                      {formatNumbers(minute)}{" "}
                      {minute === 0 || minute === 1 ? "minute" : "minutes"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <label htmlFor="sounds">Sounds</label>
              <div>
                <select
                  id="sounds"
                  className={`${modalBgColor} ${textColorClass} alarmSelectBox`}
                >
                  {sounds.map((sound) => (
                    <option
                      className="colorDropdownAlarm"
                      key={`sound-${sound.index}`}
                      value={sound.index}
                    >
                      {sound.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="mt-3 mb-3">
              <div className="d-flex justify-content-around">
                {days.map((day) => (
                  <div
                    key={day.id}
                    className={`p-2 px-3 me-2 alarmDays ${
                      activeDays.includes(day.id) ? "active" : ""
                    }`}
                    onClick={() => handleAlarmClick(day.id)}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
            </div> */}
            <div className="col-md-12">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className={`${modalBgColor} ${textColorClass} alarmInputBox`}
              />
            </div>
          </div>

          <div
            className={`mt-3 p-3 backgroundColorConfirmation d-flex justify-content-between`}
          >
            <Button
              onClick={handleAlarmModalUpdate}
              className="confirmBtnAlarm"
              variant="success"
            >
              Save Alarm
            </Button>
            <Button
              onClick={handleAlarmModalClose}
              className="cancelBtnAlarm"
              variant="danger"
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAlarmModalRing}
        onHide={handleAlarmModalRingClose}
        className="backgroundTransparent"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body
          className={`${modalBgColor} ${textColorClass} confirmBtn modalBorderRadiusAndShadow`}
        >
          <div className="d-flex justify-content-center">
            <img
              src="./ClockImgToRing.png"
              alt=""
              // height={100}
              // width={100}
              id="alarmRing"
              className=" "
            />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              onClick={pauseWhenRinOut}
              className={`btn w-75 ${btnColor} `}
            >
              Pause
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        {allAlarm.map((alarm) => (
          <div key={alarm.uniqueId} id={alarm.uniqueId}>
            <div className="p-4 border bg-transparent rounded-pill mb-4">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div>{alarm.hours.slice(0, 2)}&nbsp;:</div>
                  <div>&nbsp;{alarm.minutes}</div>
                  <div>&nbsp;{alarm.hours.slice(2, 5)}</div>
                </div>
                <div className="text-center">{alarm.title}</div>
                <div className="d-flex">
                  <div>
                    <Form.Check
                      type="switch"
                      checked={alarm.status}
                      id="custom-switch"
                      label=""
                      onChange={() => toggleAlarmStatus(alarm.uniqueId)}
                    />
                  </div>
                  <FaTrash
                    size={20}
                    className="mx-3 cursorPointer"
                    onClick={() => removeClock(alarm.uniqueId)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;

// Example:
// Let's say you call generateOptions(3, 7).

// Create an array with a specified length:

// { length: end - start + 1 } calculates the length of the array. In this case, it is { length: 7 - 3 + 1 } which equals { length: 5 }.
// So, it creates an array with 5 slots, but the values in these slots are initially undefined.
// javascript
// Copy code
// // Result after the first part:
// [undefined, undefined, undefined, undefined, undefined]
// Iterate over the array using map:

// The second argument to Array.from is a mapping function. It takes two parameters, _ and index.
// _ is a placeholder for the current element in the array, but since it's not used in the function, it's common to use _ as a convention to indicate that it's not important.
// javascript
// Copy code
// // Mapping function applied to each element of the array:
// // index: 0, 1, 2, 3, 4
// (_, index) => start + index
// Generate values for the array:

// The mapping function calculates the value for each element in the array using the formula start + index.
// javascript
// Copy code
// // Result after applying the mapping function:
// [3 + 0, 3 + 1, 3 + 2, 3 + 3, 3 + 4]
// Simplifying each term:

// javascript
// Copy code
// [3, 4, 5, 6, 7]
// Final result:

// The function returns the final array, which is [3, 4, 5, 6, 7].
// So, in the example generateOptions(3, 7) returns an array representing the range of numbers from 3 to 7. This array can be used for various purposes, and in your code, it's used to generate options for hours and minutes in the dropdowns.
