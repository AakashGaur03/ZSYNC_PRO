import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaTrash ,FaEdit } from "react-icons/fa";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(JSON.parse(sessionStorage.getItem("taskArray"))?JSON.parse(sessionStorage.getItem("taskArray")):[]);
  const [editingTaskId,setEditingTaskId]=useState(null)

  useEffect(() => {
    const storedTask = JSON.parse(sessionStorage.getItem("taskArray")) || []
    setTasks(storedTask);
  },[]);

  useEffect(()=>{
    sessionStorage.setItem("taskArray",JSON.stringify(tasks));
  },[tasks])

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
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const editTask = (taskId) => {
    setEditingTaskId(taskId)
    const taskToEdit = tasks.find((task)=>task.id===taskId)
    if(taskToEdit)
    {
      setNewTask(taskToEdit.text)
    }
  };
  const saveEditing =()=>{
    const updatedTask = tasks.map((task)=>task.id===editingTaskId? {...task , text:newTask} : task )
    setTasks(updatedTask)
    setEditingTaskId(null)
    setNewTask("")
  }
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
        <Button variant="primary" id="" onClick={editingTaskId? saveEditing :addTask}>
          {editingTaskId ? "Save Task" :"Add Task"}
        </Button>
      </InputGroup>
      {/* <div>{newTask}</div> */}
      <ul style={{ overflowY: "auto", maxHeight: "75vh" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: "flex" }}>
            <div style={{ width: "80%" }}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
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
