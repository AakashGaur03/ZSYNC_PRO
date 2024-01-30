import React, { createContext, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";

// Create ConfirmModalContext
const ConfirmModalContext = createContext();
const tasks = JSON.parse(localStorage.getItem("taskArray"))
  ? JSON.parse(localStorage.getItem("taskArray"))
  : [];
// Create ConfirmModalContextProvider component
const ConfirmModalContextProvider = ({ children }) => {
  const [showconfirmModal, setshowConfirmModal] = useState(false);
  const [taskIdtobeDeleted,setTaskIdtobeDeleted] = useState(null)
  const [tasktobeDeleted,setTasktobeDeleted] = useState(null)
  const handleShowConfirmModalClose = () => {
    setshowConfirmModal(false);
  };
  const handleShowConfirmModalUpdate = (ID) => {
    setTaskIdtobeDeleted(ID)
    console.log("first", ID)
    console.log(taskIdtobeDeleted,"Thisss")
    const deleteTask = tasks.find((task) => task.id === ID)
    setTasktobeDeleted(deleteTask)
    console.log(tasktobeDeleted,"GGGGG")
    
    
console.log(tasktobeDeleted,"tasfff")
    if (tasktobeDeleted) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskIdtobeDeleted ? { ...task, deletedAt: new Date().toLocaleString() } : task
      );
      console.log(updatedTasks,"UPDATREEEE")
      localStorage.setItem("taskArray", JSON.stringify(updatedTasks));
    }



    setshowConfirmModal(false);
  };
  const handleShowConfirmModalShow = () => {
    setshowConfirmModal(true);
  };

  const contextValue = {
    showconfirmModal,
    handleShowConfirmModalShow,
    handleShowConfirmModalClose,
    handleShowConfirmModalUpdate,
  };
  return (
    <ConfirmModalContext.Provider value={contextValue}>
      <>
        <Modal show={showconfirmModal} onHide={handleShowConfirmModalClose}>
          <Modal.Body>Are you Sure You want to delete</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleShowConfirmModalUpdate()}>
              Yes
            </Button>
            <Button variant="primary" onClick={handleShowConfirmModalClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {children}
      </>
    </ConfirmModalContext.Provider>
  );
};

const useConfirmModalContext = () => {
  return useContext(ConfirmModalContext);
};

export { ConfirmModalContextProvider, useConfirmModalContext };
