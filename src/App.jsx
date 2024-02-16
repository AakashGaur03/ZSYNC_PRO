import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext, ClockContext } from "./Contexts";

import { NavbarComp, Tasks, Clock, Alarm } from "./components";

function App() {
  const { theme } = useContext(ThemeContext);
  const { alarmActiveApp } = useContext(ClockContext);

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("taskArray"))
      ? JSON.parse(localStorage.getItem("taskArray"))
      : []
  );

  const [incognitoTasks, setIncognitoTasks] = useState(
    JSON.parse(sessionStorage.getItem("taskArray"))
      ? JSON.parse(sessionStorage.getItem("taskArray"))
      : []
  );

  return (
    <>
      <Router>
        <>
          <NavbarComp
            tasks={tasks}
            setTasks={setTasks}
            incognitoTasks={incognitoTasks}
            setIncognitoTasks={setIncognitoTasks}
          />
          <Container className="minHeightContainer">
            <Row
              className={`${
                theme === "Dark"
                  ? "bg-secondar y bg-mid text-white"
                  : "bgSlighDarkWhite text-black"
              } mhexcludingNav`}
            >
              <Col lg="4">
                <Clock />
                <div style={{ display: "none" }}>
                  {" "}
                  {/* Done Because Alarm gets active whenever website Loads*/}
                  {alarmActiveApp && <Alarm />}
                </div>
              </Col>
              <Col lg="8" className="adjustonIncognito">
                <Routes>
                  <Route
                    path=""
                    element={
                      <Tasks
                        tasks={tasks}
                        setTasks={setTasks}
                        storage={localStorage}
                        type={"normal"}
                      />
                    }
                  />
                  <Route
                    path="/incognito-todo"
                    element={
                      <Tasks
                        tasks={incognitoTasks}
                        setTasks={setIncognitoTasks}
                        storage={sessionStorage}
                        type={"incognito"}
                      />
                    }
                  />
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
