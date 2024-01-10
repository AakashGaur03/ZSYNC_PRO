import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SlReload } from "react-icons/sl";
import { MdDelete } from "react-icons/md";

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
            <div key={task.id} className="d-flex justify-content-between me-4">
              {/* <p>ID: {task.id}</p> */}
              <div>

              <p className="fs-5">
                <strong>
                {task.title}
                </strong>
                </p>
              </div>
                <div>
                <SlReload size={25}/>
                <MdDelete size={25} className="ms-3"/>
                </div>
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
