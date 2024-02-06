import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SlReload } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import ThemeContext from "../Contexts/ThemeContext";

function RecentltyDeletedModal({
  showRecentlyDeletedModal,
  handleCloseRecentlyDeleted,
  handleShowRecentlyDeletedModal,
  recentlyDeletedTasks,
}) {
  const filteredDeletedTask = recentlyDeletedTasks.filter(
    (tasks) => tasks.deletedAt !== null
  );

  const { theme } = useContext(ThemeContext);
  console.log(theme, "gg");
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";

  return (
    <>
      <Modal
        show={showRecentlyDeletedModal}
        onHide={handleCloseRecentlyDeleted}
        centered
      >
        <div className={`${modalBgColor} ${textColorClass}`}>
          <Modal.Header closeButton className={`${textColorClass} border-0 text-center`}>
            <Modal.Title className="text-center">Recently Deleted Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {filteredDeletedTask.map((task) => (
              <div
                key={task.id}
                className="d-flex justify-content-between me-4"
              >
                {/* <p>ID: {task.id}</p> */}
                <div>
                  <p className="fs-5">
                    <strong>{task.title}</strong>
                  </p>
                </div>
                <div>
                  <SlReload size={25} />
                  <MdDelete size={25} className="ms-3" />
                </div>
              </div>
            ))}
          </Modal.Body>
          {/* <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={handleCloseRecentlyDeleted}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseRecentlyDeleted}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </div>
      </Modal>
    </>
  );
}

export default RecentltyDeletedModal;
