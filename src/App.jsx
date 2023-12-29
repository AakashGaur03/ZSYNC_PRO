import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useContext } from "react";
import Todo from "./components/Todo";
import IncognitoTodo from "./components/IncognitoTodo";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clock from "./components/Clock";
import ThemeContext from "./Contexts/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Router>
        <>
          <NavbarComp />
          <Container className="minHeightContainer">
            <Row
              className={`${
                theme === "Dark"
                  ? "bg-secondary text-white"
                  : "bgSlighDarkWhite text-black"
              } mhexcludingNav`}
            >
              <Col lg="4">
                <Clock />
              </Col>
              <Col lg="8">
                <Routes>
                  <Route path="" element={<Todo />} />
                  <Route path="/incognito-todo" element={<IncognitoTodo />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </>
      </Router>
    </>
  );
}

export default App;
