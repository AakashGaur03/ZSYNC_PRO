import { Container, Nav, NavDropdown, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { FaRegClock, FaTrash } from "react-icons/fa";

import "../NavbarCSS.css";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../Contexts/ThemeContext";
import ClockModal from "./ClockModal";

const NavbarComp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const navbarColorClass = theme === "Light" ? "bgSlighDarkWhite" : "bg-black";

  useEffect(() => {
    // Update the className of the <html> element based on the theme
    document.body.className = theme === 'Light' ? 'bg-light' : 'bg-dark';
  }, [theme]);

  const [showClockModal, setShowClockModal] = useState(false);

  const handleCloseClockModal = () => {
    setShowClockModal(false);
  }
  const handleShowClockModal = () => setShowClockModal(true);

  const handleUpdateClockModal = () => {
    setShowClockModal(false);
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
              >
                <FaTrash size="20px" className="me-3" />
                Recently Deleted
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
      <ClockModal showClockModal={showClockModal} handleCloseClockModal={handleCloseClockModal} handleUpdateClockModal={handleUpdateClockModal} />
        </Container>
      </Navbar>

    </>
  );
};

export default NavbarComp;
