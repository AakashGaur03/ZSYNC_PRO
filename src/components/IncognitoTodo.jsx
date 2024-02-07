import React, { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { FaTrash, FaEdit, FaStar, FaFilter } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import  ThemeContext  from "../Contexts/ThemeContext";
// import { ConfirmModalContextProvider,useConfirmModalContext } from "../Contexts/ConfirmModalProvider";

const IncognitoTodo = () => {
  // const { handleShowConfirmModalShow,handleShowConfirmModalClose,handleShowConfirmModalUpdate } = useConfirmModalContext();
  const { theme } = useContext(ThemeContext);
  // console.log(theme,"gg")
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [importantTaskToBeDeleted, setImportantTaskToBeDeleted] =
    useState(null);

  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleDeleteConfirmModal = () => {
    // console.log(importantTaskToBeDeleted, "IMpo");
    if (importantTaskToBeDeleted !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === importantTaskToBeDeleted) {
          return { ...task, deletedAt: new Date().toLocaleString() };
        }
        return { ...task };
      });
      setTasks(updatedTasks);
    }
    setShowConfirmModal(false);
  };
  const handleShowConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(sessionStorage.getItem("taskArray"))
      ? JSON.parse(sessionStorage.getItem("taskArray"))
      : []
  );
  const [viewTask, setViewTask] = useState(false);
  const [viewedTask, setViewedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Task");

  const handleViewTask = (task) => {
    setViewedTask(task);
    setViewTask(true);
  };

  useEffect(() => {
    const storedTask = JSON.parse(sessionStorage.getItem("taskArray")) || [];
    setTasks(storedTask);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("taskArray", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    switch (selectedFilter) {
      case "All":
        return true;
      case "Important":
        return task.important;
      case "Completed":
        return task.completed;
      case "Uncompleted":
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
      setShowAddTodo(false);
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
    // handleShowConfirmModalUpdate(taskId)
    // handleShowConfirmModalClose()
    const updatedTasks = tasks.map((task) => {
      setImportantTaskToBeDeleted(taskId);
      if (
        task.id === taskId &&
        // (!task.important || handleShowConfirmModalShow())
        // (!task.important || window.confirm("Are you Sure"))
        (!task.important || handleShowConfirmModal())
      ) {
        return { ...task, deletedAt: new Date().toLocaleString() };
      }
      return { ...task };
    });
    setTasks(updatedTasks);
  };
  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTaskTitle(taskToEdit.title);
      setNewTask(taskToEdit.text);
      setModalTitle("Edit Task");
      setShowAddTodo(true);
    }
  };
  const saveEditing = () => {
    const updatedTask = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, title: newTaskTitle, text: newTask }
        : task
    );
    setShowAddTodo(false);
    setTasks(updatedTask);
    setEditingTaskId(null);
    setNewTaskTitle("");
    setNewTask("");
    setModalTitle("Add Task")
  };
  const closeEditingAddModal=()=>{
    setShowAddTodo(false);
    setEditingTaskId(null);
    setNewTaskTitle("");
    setNewTask("");
    setModalTitle("Add Task")

  }
  return (
    <>
        <div className="backgroundIncognito">
      <img src="../../public/Images/incognitoImg.png" alt="" className="incognitoImg"/>
    </div>
      {/* <div className="fs-4">Add Todo</div> */}
      <div className="d-flex justify-content-between mx-4 mt-3">
        <div className="align-self-center">
          <CiCirclePlus
            size={40}
            onClick={() => setShowAddTodo(true)}
            className="cursorPointer"
          />
        </div>

        <div className="pt-2 pb-3 text-end me-4">
          {tasks.some((task) => task.deletedAt == null) && (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic2">
                <FaFilter />
              </Dropdown.Toggle>

              <Dropdown.Menu className="text-center dropdownFilterMain">
                <Dropdown.Item
                  className={`${
                    selectedFilter === "All" ? "filterdropdownActive" : ""
                  } dropdownFilter topDropdownFilter`}
                  onClick={() => setSelectedFilter("All")}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${
                    selectedFilter === "Important" ? "filterdropdownActive" : ""
                  } dropdownFilter`}
                  onClick={() => setSelectedFilter("Important")}
                >
                  Important
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${
                    selectedFilter === "Completed" ? "filterdropdownActive" : ""
                  } dropdownFilter `}
                  onClick={() => setSelectedFilter("Completed")}
                >
                  Completed
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${
                    selectedFilter === "Uncompleted"
                      ? "filterdropdownActive"
                      : ""
                  } dropdownFilter bottomDropdownFilter`}
                  onClick={() => setSelectedFilter("Uncompleted")}
                >
                  Uncompleted
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      <Modal show={showAddTodo} onHide={() => setShowAddTodo(false)} centered backdrop="static"
        keyboard={false}>
        <div className={`${modalBgColor} ${textColorClass} ConfirmModalColor`}>

        <Modal.Header className="border-0" closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <InputGroup className="mb-3">
            <Form.Control
              name="setNewTaskTitle"
              className="inputAddTodo"
              type="text"
              value={newTaskTitle}
              onChange={(e) => {
                setNewTaskTitle(e.target.value);
              }}
              placeholder="Add Title"
              aria-label=""
              aria-describedby="addTask"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              name="setNewTask"
              className="inputAddTodo"
              as="textarea"
              rows={5}
              type="text"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              placeholder="Add Task"
            ></Form.Control>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="primary"
            className="saveEditModal"
            id=""
            onClick={editingTaskId ? saveEditing : addTask}
          >
            {editingTaskId ? "Save Task" : "Add Task"}
          </Button>
          <Button variant="secondary" className="CloseModal" onClick={() => closeEditingAddModal()}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => setShowAddTodo(false)}>
            Save Changes
          </Button> */}
        </Modal.Footer>
        </div>
      </Modal>

      <Modal show={viewTask} onHide={() => setViewTask(false)}>
        {/* <Modal.Header closeButton> */}
        <Modal.Title className="text-center mt-4 mb-4">
          <strong>{viewedTask ? viewedTask.title.toUpperCase() : ""}</strong>
        </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body className="ms-3 fs-5 mb-5">
          {viewedTask ? viewedTask.text : ""}
        </Modal.Body>
        {/* <Modal.Footer> */}
        <Button variant="secondary" onClick={() => setViewTask(false)}>
          Close
        </Button>
        {/* </Modal.Footer> */}
      </Modal>

      {/* <div>{newTask}</div> */}
      <ul style={{ overflowY: "auto", maxHeight: "75vh" }}>
        {filteredTasks.map((task) => {
          return (
            (task.deletedAt === null || task.deletedAt === undefined) && (
              <li key={task.id} style={{ display: "flex" }}>
                <div
                  style={{ width: "80%" }}
                  onClick={() => handleViewTask(task)}
                >
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
                  name="toggleTaskStatus"
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
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
        <Modal.Body
          // style={{ ...modalBodyStyle }}
          className={`${modalBgColor} ${textColorClass} ConfirmModalColor`}
        >
          <Modal.Title className="text-center pb-4">
            Confirmation Modal
          </Modal.Title>
          Are you sure you want to delete as this is an Important Task
          <div
            className={`mt-3 p-3 backgroundColorConfirmation d-flex justify-content-between`}
          >
            <Button
              className="me-4 deleteTaskModalBtn"
              variant="danger"
              onClick={() => handleDeleteConfirmModal()}
            >
              Confirm
            </Button>
            <Button
              variant="success"
              className="dontDeleteTaskModalBtn"
              onClick={handleCloseConfirmModal}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IncognitoTodo;
