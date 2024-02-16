import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  Badge,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { FaRegClock, FaTrash } from "react-icons/fa";
import { IoIosMusicalNotes } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { ClockModal, SoundModal, RecentltyDeletedModal } from "../index";

import { ClockContext, ThemeContext, ToastContext } from "../../Contexts";

const NavbarComp = ({ tasks, setTasks, incognitoTasks }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { showToast } = useContext(ToastContext);
  const { activeClock, setActiveClock, activeClass, setActiveClass } =
    useContext(ClockContext);
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const navbarColorClass = theme === "Light" ? "bgSlighDarkWhite" : "bg-black";
  const bgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const [showRecentlyDeletedModal, setShowRecentlyDeletedModal] =
    useState(false);
  const [numberTodo, setNumberTodo] = useState("");
  const [incognitoNumberTodo, setIncognitoNumberTodo] = useState("");

  const handleCloseRecentlyDeleted = () => setShowRecentlyDeletedModal(false);
  const handleShowRecentlyDeletedModal = () => {
    setRecentlyDeletedTasks(
      JSON.parse(localStorage.getItem("taskArray")) || []
    );
    setShowRecentlyDeletedModal(true);
  };

  const [recentlyDeletedTasks, setRecentlyDeletedTasks] = useState(
    JSON.parse(localStorage.getItem("taskArray")) || []
  );

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

  useEffect(() => {
    document.body.className =
      theme === "Light" ? "bg-light backgroundLight" : "bg-dark backgroundDark";
  }, [theme]);

  const [showClockModal, setShowClockModal] = useState(false);

  const handleCloseClockModal = () => {
    // + converts string in number
    setActiveClass(+activeClock.split("").pop());
    localStorage.setItem("ClockID", +activeClock.split("").pop());
    setShowClockModal(false);
  };
  const handleShowClockModal = () => setShowClockModal(true);

  const handleUpdateClockModal = () => {
    setActiveClock(`clock${activeClass}`);
    localStorage.setItem("ClockName", `clock${activeClass}`);
    localStorage.setItem("ClockID", activeClass);
    showToast("Clock Updated Successfully", "green", "white");
    setShowClockModal(false);
  };

  const [showSoundModal, setShowSoundModal] = useState(false);

  const handleCloseSoundModal = () => {
    setShowSoundModal(false);
    setSelectedSound(null);
    return selectedSound;
  };
  const handleShowSoundModal = () => setShowSoundModal(true);
  const handleUpdateSoundModal = () => {
    setShowSoundModal(false);
    const value = sounds.find((item) => {
      return item.index === selectedSound;
    });
    if (value) {
      localStorage.setItem("timerSound", JSON.stringify(value));
    } else {
      localStorage.setItem(
        "timerSound",
        JSON.stringify({
          index: 1,
          name: "classic-alarm",
          src: "classic-alarm.wav",
        })
      );
    }
    showToast("Updated Timer Sound", "green", "white");
  };

  const [selectedSound, setSelectedSound] = useState(null);

  const handleRadioChange = (index) => {
    setSelectedSound(index);
  };

  const numberAtTodoTop = tasks.filter(
    (task) => task.deletedAt === null && task.completed === false
  );
  useEffect(() => {
    setNumberTodo(numberAtTodoTop.length);
  }, [numberTodo, tasks]);

  const numberAtIncognitoTodoTop = incognitoTasks.filter(
    (task) => task.deletedAt === null && task.completed === false
  );

  useEffect(() => {
    setIncognitoNumberTodo(numberAtIncognitoTodoTop.length);
  }, [incognitoNumberTodo, incognitoTasks]);

  return (
    <>
      <Navbar
        expand="lg"
        className={`zindex2 ${navbarColorClass} ${textColorClass}`}
      >
        <Container>
          <Navbar.Brand className={textColorClass}>ZSYNC PRO</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-light"
          />
          <Navbar.Collapse id="basic-navbar-nav" className={"btn-light"}>
            <Nav className="ms-auto gapNavItem">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${textColorClass} nav-link
                  fw-bold ${isActive ? "NavActiveCSS" : ""} navItemClass`
                }
              >
                <div style={{ position: "relative" }}>
                  Todo
                  {numberTodo > 0 && (
                    <Badge
                      pill
                      className={`${bgColor}`}
                      style={{ marginTop: "-4px", position: "absolute" }}
                    >
                      {numberTodo}
                    </Badge>
                  )}
                </div>
              </NavLink>
              <NavLink
                to="/incognito-todo"
                className={({ isActive }) =>
                  `${textColorClass} nav-link marginNavItem
                  fw-bold ${isActive ? "NavActiveCSS" : ""} navItemClass`
                }
              >
                <div style={{ position: "relative" }}>
                  Incognito Todo
                  {incognitoNumberTodo > 0 && (
                    <Badge
                      pill
                      className={bgColor}
                      style={{ marginTop: "-4px", position: "absolute" }}
                    >
                      {"!!"}
                    </Badge>
                  )}
                </div>
              </NavLink>
            </Nav>
            <Form className="togglePosition" name="togglePosition">
              <Form.Check
                name="themeMode"
                checked={theme === "Dark"}
                onChange={toggleTheme}
                type="switch"
                label={`${theme} Mode`}
              />
            </Form>
            <NavDropdown
              title={
                theme === "Light" ? (
                  <IoSettings size="30px" />
                ) : (
                  <IoSettingsOutline size="30px" />
                )
              }
              id="settingDropdown"
            >
              <NavDropdown.Item
                className={`settingDropdownItems ${navbarColorClass} ${textColorClass}`}
                onClick={handleShowClockModal}
              >
                <FaRegClock size="20px" className="me-3" />
                Clock
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`settingDropdownItems ${navbarColorClass} ${textColorClass}`}
                onClick={handleShowRecentlyDeletedModal}
              >
                <FaTrash size="20px" className="me-3" />
                Recently Deleted
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`settingDropdownItems ${navbarColorClass} ${textColorClass}`}
                onClick={handleShowSoundModal}
              >
                <IoIosMusicalNotes size="20px" className="me-3" />
                Sounds
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>

          <ClockModal
            showClockModal={showClockModal}
            handleCloseClockModal={handleCloseClockModal}
            handleUpdateClockModal={handleUpdateClockModal}
          />
          <RecentltyDeletedModal
            showRecentlyDeletedModal={showRecentlyDeletedModal}
            setShowRecentlyDeletedModal={setShowRecentlyDeletedModal}
            handleCloseRecentlyDeleted={handleCloseRecentlyDeleted}
            handleShowRecentlyDeletedModal={handleShowRecentlyDeletedModal}
            recentlyDeletedTasks={recentlyDeletedTasks}
            setRecentlyDeletedTasks={setRecentlyDeletedTasks}
            tasks={tasks}
            setTasks={setTasks}
          />

          <SoundModal
            showSoundModal={showSoundModal}
            handleCloseSoundModal={handleCloseSoundModal}
            handleUpdateSoundModal={handleUpdateSoundModal}
            handleRadioChange={handleRadioChange}
            selectedSound={selectedSound}
            setSelectedSound={selectedSound}
            sounds={sounds}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
