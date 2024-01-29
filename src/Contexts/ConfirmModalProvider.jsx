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
  const handleShowConfirmModalClose = (ID) => {
      console.log("first");
      console.log(ID, "ID");
      console.log(tasks, "TASK");
      console.log("JJ");
      setshowConfirmModal(false);
  };
  const handleShowConfirmModalShow = () => {
    setshowConfirmModal(true);
  };

  const contextValue = {
    showconfirmModal,
    handleShowConfirmModalShow,
    handleShowConfirmModalClose,
  };
  return (
    <ConfirmModalContext.Provider value={contextValue}>
      <>
        <Modal show={showconfirmModal} onHide={handleShowConfirmModalClose}>
          <Modal.Body>Are you Sure You want to delete</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShowConfirmModalClose}>
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
