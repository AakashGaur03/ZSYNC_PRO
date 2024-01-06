import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup,Dropdown } from "react-bootstrap";
import { FaTrash, FaEdit, FaStar, FaFilter } from "react-icons/fa";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("taskArray"))
      ? JSON.parse(localStorage.getItem("taskArray"))
      : []
  );
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedFilter,setSelectedFilter]=useState("All");

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("taskArray")) || [];
    setTasks(storedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem("taskArray", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks=tasks.filter((task)=>{
    switch (selectedFilter) {
      case "All":
        return true;
      case "Important":
        return task.important;
      case "Completed":
        return task.completed;
      case "UnCompleted":
        return !task.completed;
        
      default:
        return true;
    }
  })

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
  };
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const toggleImportantStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTask(taskToEdit.text);
    }
  };
  const saveEditing = () => {
    const updatedTask = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: newTask } : task
    );
    setTasks(updatedTask);
    setEditingTaskId(null);
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
        <Button
          variant="primary"
          id=""
          onClick={editingTaskId ? saveEditing : addTask}
        >
          {editingTaskId ? "Save Task" : "Add Task"}
        </Button>
      </InputGroup>

      <div className="pt-2 pb-3 text-end me-4">
      <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <FaFilter />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className={`${selectedFilter==="All"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("All")}>All</Dropdown.Item>
        <Dropdown.Item className={`${selectedFilter==="Important"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("Important")}>Important</Dropdown.Item>
        <Dropdown.Item className={`${selectedFilter==="Completed"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("Completed")}>Completed</Dropdown.Item>
        <Dropdown.Item className={`${selectedFilter==="UnCompleted"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("UnCompleted")}>UnCompleted</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
      {/* <div>{newTask}</div> */}
      <ul style={{ overflowY: "auto", maxHeight: "75vh" }}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ display: "flex" }}>
            <div style={{ width: "80%" }}>
              <span
              className={`fw-bold fs-5`}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.important ? "gold" : "inherit",
                }}
              >
                {task.text}
              </span>
            </div>
            <Form.Check
              className="me-3"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
            />
            <FaStar
              size={20}
              className={`me-3 cursorPointer ${
                task.important ? "starpriority" : ""
              }`}
              checked={task.important}
              onClick={() => toggleImportantStatus(task.id)}
            />
            <FaEdit
              size={20}
              className="me-3 cursorPointer"
              onClick={() => editTask(task.id)}
            />
            <FaTrash
              size={20}
              className="me-3 cursorPointer"
              onClick={() => removeTask(task.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
