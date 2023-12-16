import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
const NavbarComp = ({ theme, onToggleClick, themeSwitch }) => {
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const navbarColorClass = theme === "Light" ? "bg-light" : "bg-dark";

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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
