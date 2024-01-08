import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RecentltyDeletedModal({
  showRecentlyDeletedModal,
  handleCloseRecentlyDeleted,
  handleShowRecentlyDeletedModal,
  recentlyDeletedTasks
}) {


  const filteredDeletedTask = recentlyDeletedTasks.filter(
    (tasks) => tasks.deletedAt !== null
  );

  return (
    <>
      <Modal
        show={showRecentlyDeletedModal}
        onHide={handleCloseRecentlyDeleted}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredDeletedTask.map((task) => (
            <div key={task.id}>
              <p>ID: {task.id}</p>
              <p>Text: {task.text}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRecentlyDeleted}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseRecentlyDeleted}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecentltyDeletedModal;
