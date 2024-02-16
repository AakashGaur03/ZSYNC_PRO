import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Dropdown,
  Modal,
  Badge,
} from "react-bootstrap";
import { FaTrash, FaEdit, FaStar, FaFilter } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { ThemeContext, ToastContext } from "../../Contexts";

const Tasks = ({ tasks, setTasks, storage, type }) => {
  const { theme } = useContext(ThemeContext);
  const { showToast } = useContext(ToastContext);
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const btnColor = theme === "Light" ? "btnLightTheme" : "btnDarkTheme";
  const bgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";

  const iconColor = theme === "Light" ? "colorWhite" : "";

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [importantTaskToBeDeleted, setImportantTaskToBeDeleted] =
    useState(null);

  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleDeleteConfirmModal = () => {
    if (importantTaskToBeDeleted !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === importantTaskToBeDeleted) {
          return { ...task, deletedAt: new Date().toLocaleString() };
        }
        return { ...task };
      });
      setTimeout(() => {
        setTasks(updatedTasks);
      }, 1000);
    }
    document
      .getElementById(importantTaskToBeDeleted)
      .classList.add("disintegrate");
    if (type === "normal") {
      showToast("Task Deleted Successfully");
    } else {
      showToast("Incognito Task Deleted Successfully");
    }
    setShowConfirmModal(false);
  };
  const handleShowConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTask, setNewTask] = useState("");
  const [viewTask, setViewTask] = useState(false);
  const [viewedTask, setViewedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [modalTitle, setModalTitle] = useState(
    type === "normal" ? "Add Task" : "Add Incognito Task"
  );

  useEffect(() => {
    setModalTitle(type === "normal" ? "Add Task" : "Add Incognito Task");
  }, [type]);

  const handleViewTask = (task) => {
    setViewedTask(task);
    setViewTask(true);
  };

  useEffect(() => {
    const storedTask = JSON.parse(storage.getItem("taskArray")) || [];
    setTasks(storedTask);
  }, []);

  useEffect(() => {
    storage.setItem("taskArray", JSON.stringify(tasks));
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

  const addTask = (e) => {
    e.preventDefault();

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
    if (type === "normal") {
      showToast("Task Added Successfully", "green", "white");
    } else {
      showToast("Incognito Task Added Successfully", "green", "white");
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
    const updatedTask = updatedTasks.find((task) => task.id === taskId);

    if (updatedTask && updatedTask.important) {
      if (type === "normal") {
        showToast("Task Marked as Important", "darkgoldenrod");
      } else {
        showToast("Incognito Task Marked as Important", "darkgoldenrod");
      }
    } else {
      if (type === "normal") {
        showToast("Task Marked as Not Important", "white", "black");
      } else {
        showToast("Incognito Task Marked as Not Important", "white", "black");
      }
    }
    setTasks(updatedTasks);
  };
  const removeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      setImportantTaskToBeDeleted(taskId);

      if (
        task.id === taskId &&
        (!task.important || handleShowConfirmModal())
      ) {
        if (type === "normal") {
          showToast("Task Deleted Successfully");
        } else {
          showToast("Incognito Task Deleted Successfully");
        }
        document.getElementById(taskId).classList.add("disintegrate");
        return { ...task, deletedAt: new Date().toLocaleString() };
      }

      return { ...task };
    });
    setTimeout(() => {
      setTasks(updatedTasks);
    }, 1000);
  };
  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTaskTitle(taskToEdit.title);
      setNewTask(taskToEdit.text);
      if (type === "normal") {
        setModalTitle("Edit Task");
      } else {
        setModalTitle("Edit Incognito Task");
      }
      setShowAddTodo(true);
    }
  };
  const saveEditing = (e) => {
    e.preventDefault();
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
    if (type === "normal") {
      setModalTitle("Add Task");
      showToast("Task Edited Successfully", "grey");
    } else {
      setModalTitle("Add Incognito Task");
      showToast("Incognito Task Edited Successfully", "grey");
    }
  };
  const closeEditingAddModal = () => {
    setShowAddTodo(false);
    setEditingTaskId(null);
    setNewTaskTitle("");
    setNewTask("");
    if (type === "normal") {
      setModalTitle("Add Task");
    } else {
      setModalTitle("Add Incognito Task");
    }
  };
  return (
    <>
      {type === "incognito" && (
        <div className="backgroundIncognito">
          <img
            src="./Images/incognitoImg.png"
            alt=""
            className="incognitoImg"
          />
        </div>
      )}
      {/* <div className="fs-4">Add Todo</div> */}
      <div className="d-flex justify-content-between mx-4 mt-3">
        <div className="align-self-center">
          <CiCirclePlus
            size={40}
            onClick={() => setShowAddTodo(true)}
            className="cursorPointer"
          />
        </div>
        {tasks.some((task) => task.deletedAt == null) && (
          <h5 className="align-self-center m-0">
            <Badge className={`${bgColor}`}>
              Total {type === "normal" ? "Task" : "Incognito Task"} :{" "}
              {tasks.filter((task) => task.deletedAt === null).length}
            </Badge>
          </h5>
        )}
        <div className="pt-2 pb-3 text-end me-4">
          {tasks.some((task) => task.deletedAt == null) && (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic2" className={`${btnColor}`}>
                <FaFilter />
              </Dropdown.Toggle>

              <Dropdown.Menu className="text-center dropdownFilterMain">
                <Dropdown.Item
                  className={`${
                    selectedFilter === "All" ? "filterdropdownActive" : ""
                  } dropdownFilter topDropdownFilter`}
                  onClick={() => setSelectedFilter("All")}
                >
                  <div className="d-flex justify-content-between">
                    <div className="ms-2">All</div>
                    <Badge className={`badgeClassFilter ${bgColor}`}>
                      {" "}
                      {tasks.filter((task) => task.deletedAt === null).length}
                    </Badge>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${
                    selectedFilter === "Important" ? "filterdropdownActive" : ""
                  } dropdownFilter`}
                  onClick={() => setSelectedFilter("Important")}
                >
                  <div className="d-flex justify-content-between">
                    <div className="ms-2">Important</div>
                    <Badge className={`badgeClassFilter ${bgColor}`}>
                      {" "}
                      {
                        tasks.filter(
                          (task) => task.deletedAt === null && task.important
                        ).length
                      }
                    </Badge>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${
                    selectedFilter === "Completed" ? "filterdropdownActive" : ""
                  } dropdownFilter `}
                  onClick={() => setSelectedFilter("Completed")}
                >
                  <div className="d-flex justify-content-between">
                    <div className="ms-2">Completed</div>
                    <Badge className={`badgeClassFilter ${bgColor}`}>
                      {" "}
                      {
                        tasks.filter(
                          (task) => task.deletedAt === null && task.completed
                        ).length
                      }
                    </Badge>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  className={`${
                    selectedFilter === "Uncompleted"
                      ? "filterdropdownActive"
                      : ""
                  } dropdownFilter bottomDropdownFilter`}
                  onClick={() => setSelectedFilter("Uncompleted")}
                >
                  <div className="d-flex justify-content-between">
                    <div className="ms-2">Pending</div>
                    <Badge className={`badgeClassFilter ${bgColor}`}>
                      {" "}
                      {
                        tasks.filter(
                          (task) => task.deletedAt === null && !task.completed
                        ).length
                      }
                    </Badge>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      <Modal
        className="backgroundTransparent"
        show={showAddTodo}
        onHide={() => setShowAddTodo(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <div
          className={`${modalBgColor} ${textColorClass} ConfirmModalColor modalBorderRadiusAndShadow p-3`}
        >
          <Modal.Header className="border-0" closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <form onSubmit={editingTaskId ? saveEditing : addTask}>
            <Modal.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  required
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
                  required
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
                className={`GreenModal ${btnColor}`}
                id=""
                type="submit"
              >
                {editingTaskId ? "Save Task" : "Add Task"}
              </Button>
              <Button
                variant="danger"
                className="RedModal"
                onClick={() => closeEditingAddModal()}
              >
                Close
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>

      <Modal
        show={viewTask}
        onHide={() => setViewTask(false)}
        className="backgroundTransparent"
      >
        {/* <Modal.Header closeButton> */}
        <div
          className={`${modalBgColor} ${textColorClass} ConfirmModalColor modalBorderRadiusAndShadow`}
        >
          <Modal.Title className="text-center mt-4 mb-4">
            <strong>{viewedTask ? viewedTask.title.toUpperCase() : ""}</strong>
          </Modal.Title>
          <Modal.Body className="ms-3 fs-5 mb-5">
            {viewedTask ? viewedTask.text : ""}
          </Modal.Body>
          <div className="d-flex mb-4 justify-content-center">
            <Button
              variant="secondary"
              className={`w-50 ${btnColor}`}
              onClick={() => setViewTask(false)}
            >
              Close
            </Button>
          </div>
        </div>
        {/* </Modal.Footer> */}
      </Modal>

      {/* <div>{newTask}</div> */}
      {/* <ul style={{ overflowY: "auto", maxHeight: "75vh" }} className="ps-2"> */}
      <ul className="ps-2">
        {filteredTasks.map((task) => {
          return (
            (task.deletedAt === null || task.deletedAt === undefined) && (
              <li
                id={task.id}
                key={task.id}
                className={`${task.important ? "imptodoDiv" : ""} todoDiv`}
              >
                <div
                  className="cursorPointer ps-3"
                  style={{ width: "82%" }}
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
                  } ${iconColor}`}
                  checked={task.important}
                  onClick={() => toggleImportantStatus(task.id)}
                />
                <FaEdit
                  size={20}
                  className={`me-3 cursorPointer ${iconColor}`}
                  onClick={() => editTask(task.id)}
                />
                <FaTrash
                  size={20}
                  className={`me-3 cursorPointer ${iconColor}`}
                  onClick={() => removeTask(task.id)}
                />
              </li>
            )
          );
        })}
      </ul>
      <Modal
        show={showConfirmModal}
        onHide={handleCloseConfirmModal}
        centered
        className="backgroundTransparent"
      >
        <Modal.Body
          // style={{ ...modalBodyStyle }}
          className={`${modalBgColor} ${textColorClass} ConfirmModalColor modalBorderRadiusAndShadow`}
        >
          <Modal.Title className="text-center pb-4">
            Confirmation Modal
          </Modal.Title>
          Are you sure you want to delete as this is an Important Task
          <div
            className={`mt-3 p-3 backgroundColorConfirmation d-flex justify-content-between`}
          >
            <Button
              className="me-4 RedModal"
              variant="danger"
              onClick={() => handleDeleteConfirmModal()}
            >
              Confirm
            </Button>
            <Button
              variant="success"
              className="GreenModal"
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

export default Tasks;
