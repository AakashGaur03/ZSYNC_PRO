import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, status: false }]);
    }
    setNewTask("");
  };
  return (
    <>
      <div>Todo</div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          placeholder="Add Task"
          aria-label=""
          aria-describedby="addTask"
        />
        <Button variant="primary" id="" onClick={addTask}>
          Add Task
        </Button>
      </InputGroup>
      <div>{newTask}</div>
      <ul style={{ overflowY: "auto", maxHeight: "75vh" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: "flex" }}>
            <div style={{ width: "80%" }}>
              {`${task.id} : `}
              {task.text}
            </div>
            <Form.Check className="me-3" />
            <FaEdit size={20} className="me-3" />
            <FaTrash size={20} className="me-3" />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
