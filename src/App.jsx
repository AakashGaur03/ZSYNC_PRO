import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useContext,useState } from "react";
import Todo from "./components/Todo";
import IncognitoTodo from "./components/IncognitoTodo";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clock from "./components/Clock/Clock";
import ThemeContext from "./Contexts/ThemeContext";
import Alarm from "./components/CLockSubModules/Alarm";

function App() {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("taskArray"))
      ? JSON.parse(localStorage.getItem("taskArray"))
      : []
  );
  return (
    <>
      <Router>
        <>
          <NavbarComp tasks={tasks} setTasks={setTasks} />
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
                <div style={{display:"none"}}>

                <Alarm/>
                </div>
              </Col>
              <Col lg="8" className="adjustonIncognito">
                <Routes>
                  <Route path="" element={<Todo tasks={tasks} setTasks={setTasks} />} />
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
