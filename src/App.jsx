import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useState } from "react";
import Todo from "./components/Todo";
import IncognitoTodo from "./components/IncognitoTodo";
import Clock from "./components/Clock";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("Light");
  const [themeSwitch, setThemeSwitch] = useState("");
  const toggleTheme = () => {
    if (theme === "Light") {
      setTheme("Dark");
      setThemeSwitch("checked");
    } else {
      setTheme("Light");
      setThemeSwitch("");
    }
  };
  return (
    <>
      <Router>
        <>
          <NavbarComp
            theme={theme}
            onToggleClick={toggleTheme}
            themeSwitch={themeSwitch}
          />
          <Container>
            <Row>
              <Col sm="4">
                <Clock />
              </Col>
              <Col sm="8">
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
