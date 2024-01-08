import { Container, Nav, NavDropdown, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { FaRegClock, FaTrash } from "react-icons/fa";
import { IoIosMusicalNotes } from "react-icons/io";
import "../NavbarCSS.css";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../Contexts/ThemeContext";
import ClockModal from "./Clock/ClockModal";
import ClockContext from "../Contexts/ClockContext";
import SoundModal from "./CLockSubModules/SoundModal";
import RecentltyDeletedModal from "./RecentlyDeletedModal";

const NavbarComp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { activeClock, setActiveClock, activeClass, setActiveClass } =
    useContext(ClockContext);
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const navbarColorClass = theme === "Light" ? "bgSlighDarkWhite" : "bg-black";
  const [showRecentlyDeletedModal, setShowRecentlyDeletedModal] =
    useState(false);
  const handleCloseRecentlyDeleted = () => setShowRecentlyDeletedModal(false);
  const handleShowRecentlyDeletedModal = () => {
    setRecentlyDeletedTasks(JSON.parse(localStorage.getItem("taskArray")) || []);
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
    document.body.className = theme === "Light" ? "bg-light" : "bg-dark";
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
    setShowClockModal(false);
  };

  const [currentSound, setCurrentSound] = useState("Timer");

  const [showSoundModal, setShowSoundModal] = useState(false);

  const handleCloseSoundModal = () => setShowSoundModal(false);
  const handleShowSoundModal = () => setShowSoundModal(true);
  const handleUpdateSoundModal = () => {
    setShowSoundModal(false);
    if (currentSound === "Timer") {
      const value = sounds.find((item) => {
        return item.index === selectedSound;
      });

      localStorage.setItem("timerSound", JSON.stringify(value));
    }
    if (currentSound === "Alarm") {
      console.log("Hello222");
      console.log(selectedSound);

      const value = sounds.find((item) => {
        return item.index === selectedSound;
      });
      localStorage.setItem("alarmSound", JSON.stringify(value));
    }
  };

  const [selectedSound, setSelectedSound] = useState(null);

  const handleRadioChange = (index) => {
    setSelectedSound(index);
  };

  const SetCurrentSoundParent = (parent) => {
    setCurrentSound(parent);
  };

  return (
    <>
      <Navbar expand="lg" className={`${navbarColorClass} ${textColorClass}`}>
        <Container>
          <Navbar.Brand className={textColorClass}>ZSYNC PRO</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-light"
          />
          <Navbar.Collapse id="basic-navbar-nav" className={"btn-light"}>
            <Nav className="ms-auto gapNavItem">
              <Nav.Link as={Link} to="/" className={textColorClass}>
                Todo
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/incognito-todo"
                className={`${textColorClass} marginNavItem`}
              >
                Incognito Todo
              </Nav.Link>
            </Nav>
            <Form className="togglePosition">
              <Form.Check
                checked={theme === "Dark"} // Adjust this based on your theme values
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
                className={`${navbarColorClass} ${textColorClass}`}
                onClick={handleShowClockModal}
              >
                <FaRegClock size="20px" className="me-3" />
                Clock
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`${navbarColorClass} ${textColorClass}`}
                onClick={handleShowRecentlyDeletedModal}
              >
                <FaTrash size="20px" className="me-3" />
                Recently Deleted
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`${navbarColorClass} ${textColorClass}`}
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
          />

          <SoundModal
            showSoundModal={showSoundModal}
            handleCloseSoundModal={handleCloseSoundModal}
            handleUpdateSoundModal={handleUpdateSoundModal}
            currentSound={currentSound}
            setCurrentSound={setCurrentSound}
            handleRadioChange={handleRadioChange}
            selectedSound={selectedSound}
            setSelectedSound={selectedSound}
            SetCurrentSoundParent={SetCurrentSoundParent}
            sounds={sounds}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
