import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { FaRegClock, FaTrash } from "react-icons/fa";
import { useState } from "react";

import "../NavbarCSS.css";
import ClockModal from "./ClockModal";

const NavbarComp = ({ theme, onToggleClick, themeSwitch }) => {
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const navbarColorClass = theme === "Light" ? "bg-light" : "bg-dark";

  const [activeClock, setActiveClock] = useState(1);
  const [showClockModal, setShowClockModal] = useState(false);
  const handleCloseClockModal = () => {
    // Dont Update Active Clock
    setShowClockModal(false);
  };
  const handleUpdateClockModal = () => {
    // Update Active Clock

    console.log(activeClock);
    setShowClockModal(false);
  };
  const handleShowClockModal = () => setShowClockModal(true);

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
                checked={themeSwitch}
                onChange={onToggleClick}
                type="switch"
                label={`${theme} Mode `}
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
              >
                <FaTrash size="20px" className="me-3" />
                Recently Deleted
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
          <ClockModal
            activeClock={activeClock}
            setActiveClock={setActiveClock}
            showClockModal={showClockModal}
            handleCloseClockModal={handleCloseClockModal}
            handleUpdateClockModal={handleUpdateClockModal}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
