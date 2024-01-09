// import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup,Dropdown } from "react-bootstrap";
// import { FaTrash, FaEdit, FaStar, FaFilter } from "react-icons/fa";

// const Todo = () => {
//   const [newTask, setNewTask] = useState("");
//   const [tasks, setTasks] = useState(
//     JSON.parse(localStorage.getItem("taskArray"))
//       ? JSON.parse(localStorage.getItem("taskArray"))
//       : []
//   );
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [selectedFilter,setSelectedFilter]=useState("All");

//   useEffect(() => {
//     const storedTask = JSON.parse(localStorage.getItem("taskArray")) || [];
//     setTasks(storedTask);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("taskArray", JSON.stringify(tasks));
//   }, [tasks]);

//   const filteredTasks=tasks.filter((task)=>{
//     switch (selectedFilter) {
//       case "All":
//         return true;
//       case "Important":
//         return task.important;
//       case "Completed":
//         return task.completed;
//       case "UnCompleted":
//         return !task.completed;

//       default:
//         return true;
//     }
//   })

//   const addTask = () => {
//     if (newTask.trim() !== "") {
//       const currentTime=new Date(Date.now()).toLocaleString();
//       setTasks([{ id: Date.now(), text: newTask, completed: false,important:false,createdAt:currentTime,deletedAt:null }, ...tasks]);
//       setNewTask("");
//     }
//   };
//   const toggleTaskStatus = (taskId) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };
//   const toggleImportantStatus = (taskId) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === taskId ? { ...task, important: !task.important } : task
//     );
//     setTasks(updatedTasks);
//   };
//   const removeTask = (taskId) => {
//     const updatedTasks = tasks.map((task) =>
//     task.id === taskId ? {...task,deletedAt:new Date(Date.now()).toLocaleString()}:task);
//     setTasks(updatedTasks);
//   };
//   const editTask = (taskId) => {
//     setEditingTaskId(taskId);
//     const taskToEdit = tasks.find((task) => task.id === taskId);
//     if (taskToEdit) {
//       setNewTask(taskToEdit.text);
//     }
//   };
//   const saveEditing = () => {
//     const updatedTask = tasks.map((task) =>
//       task.id === editingTaskId ? { ...task, text: newTask } : task
//     );
//     setTasks(updatedTask);
//     setEditingTaskId(null);
//     setNewTask("");
//   };
//   return (
//     <>
//       <div>Todo</div>
//       <InputGroup className="mb-3">
//         <Form.Control
//           type="text"
//           value={newTask}
//           onChange={(e) => {
//             setNewTask(e.target.value);
//           }}
//           placeholder="Add Task"
//           aria-label=""
//           aria-describedby="addTask"
//         />
//         <Button
//           variant="primary"
//           id=""
//           onClick={editingTaskId ? saveEditing : addTask}
//         >
//           {editingTaskId ? "Save Task" : "Add Task"}
//         </Button>
//       </InputGroup>

//       <div className="pt-2 pb-3 text-end me-4">
//       <Dropdown>
//       <Dropdown.Toggle id="dropdown-basic">
//         <FaFilter />
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item className={`${selectedFilter==="All"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("All")}>All</Dropdown.Item>
//         <Dropdown.Item className={`${selectedFilter==="Important"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("Important")}>Important</Dropdown.Item>
//         <Dropdown.Item className={`${selectedFilter==="Completed"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("Completed")}>Completed</Dropdown.Item>
//         <Dropdown.Item className={`${selectedFilter==="UnCompleted"?"filterdropdownActive" :""}`} onClick={()=> setSelectedFilter("UnCompleted")}>UnCompleted</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//       </div>
//       {/* <div>{newTask}</div> */}
//       <ul style={{ overflowY: "auto", maxHeight: "75vh" }}>
//         {filteredTasks.map((task) => {
//           return (task.deletedAt === null || task.deletedAt === undefined) &&
//           <li key={task.id} style={{ display: "flex" }}>
//             <div style={{ width: "80%" }}>
//               <span
//               className={`fw-bold fs-5`}
//                 style={{
//                   textDecoration: task.completed ? "line-through" : "none",
//                   color: task.important ? "gold" : "inherit",
//                 }}
//               >
//                 {task.text}
//               </span>
//             </div>
//             <Form.Check
//               className="me-3"
//               checked={task.completed}
//               onChange={() => toggleTaskStatus(task.id)}
//             />
//             <FaStar
//               size={20}
//               className={`me-3 cursorPointer ${
//                 task.important ? "starpriority" : ""
//               }`}
//               checked={task.important}
//               onClick={() => toggleImportantStatus(task.id)}
//             />
//             <FaEdit
//               size={20}
//               className="me-3 cursorPointer"
//               onClick={() => editTask(task.id)}
//             />
//             <FaTrash
//               size={20}
//               className="me-3 cursorPointer"
//               onClick={() => removeTask(task.id)}
//             />
//           </li>
//         })}
//       </ul>
//     </>
//   );
// };

// export default Todo;

import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { FaTrash, FaEdit, FaStar, FaFilter } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "react-bootstrap/Modal";

const Todo = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("taskArray"))
      ? JSON.parse(localStorage.getItem("taskArray"))
      : []
  );

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [modalTitle, setModalTitle] = useState("Add Task");
  const handleShowAddTodo = () => {
    setModalTitle("Add Task");
    setShowAddTodo(true);
  };
  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("taskArray")) || [];
    setTasks(storedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem("taskArray", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
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
  });

  const addTask = () => {
    if (newTaskTitle.trim() !== "" && newTask.trim() !== "") {
      const currentTime = new Date(Date.now()).toLocaleString();
      setTasks([
        {
          id: Date.now(),
          title: newTaskTitle,
          text: newTask,
          completed: false,
          important: false,
          createdAt: currentTime,
          deletedAt: null,
        },
        ...tasks,
      ]);
      setNewTaskTitle("");
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
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, deletedAt: new Date(Date.now()).toLocaleString() }
        : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTaskTitle(taskToEdit.title);
      setNewTask(taskToEdit.text);
      setModalTitle("Edit Task"); // Set the modal title for editing
      setShowAddTodo(true); // Open the modal for editing
    }
  };

  const saveEditing = () => {
    const updatedTask = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, title: newTaskTitle, text: newTask }
        : task
    );
    setTasks(updatedTask);
    setEditingTaskId(null);
    setNewTaskTitle("");
    setNewTask("");
  };

  return (
    <>
      <div>Todo</div>

      <CiCirclePlus size={40} onClick={() => setShowAddTodo(true)} />

      <Modal show={showAddTodo} onHide={() => setShowAddTodo(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3 ">
            <Form.Control
            className="border-0"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add Title"
              aria-label=""
              aria-describedby="addTask"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
            as="textarea"
            rows={5}
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add Text"
              aria-label=""
              aria-describedby="addTask"
            />
          </InputGroup>
          <Button
            variant="primary"
            id=""
            onClick={editingTaskId ? saveEditing : addTask}
          >
            {editingTaskId ? "Save Task" : "Add Task"}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddTodo(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="pt-2 pb-3 text-end me-4">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <FaFilter />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className={`${
                selectedFilter === "All" ? "filterdropdownActive" : ""
              }`}
              onClick={() => setSelectedFilter("All")}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              className={`${
                selectedFilter === "Important" ? "filterdropdownActive" : ""
              }`}
              onClick={() => setSelectedFilter("Important")}
            >
              Important
            </Dropdown.Item>
            <Dropdown.Item
              className={`${
                selectedFilter === "Completed" ? "filterdropdownActive" : ""
              }`}
              onClick={() => setSelectedFilter("Completed")}
            >
              Completed
            </Dropdown.Item>
            <Dropdown.Item
              className={`${
                selectedFilter === "UnCompleted" ? "filterdropdownActive" : ""
              }`}
              onClick={() => setSelectedFilter("UnCompleted")}
            >
              UnCompleted
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ul style={{ overflowY: "auto", maxHeight: "75vh" }}>
        {filteredTasks.map((task) => {
          return (
            (task.deletedAt === null || task.deletedAt === undefined) && (
              <li key={task.id} style={{ display: "flex" }}>
                <div style={{ width: "80%" }}>
                  <span
                    className={`fw-bold fs-5`}
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.important ? "gold" : "inherit",
                    }}
                  >
                    {task.title}
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
            )
          );
        })}
      </ul>
    </>
  );
};

export default Todo;
