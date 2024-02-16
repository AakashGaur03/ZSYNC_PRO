import { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { SlReload } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { ThemeContext, ToastContext } from "../../Contexts";

function RecentltyDeletedModal({
  showRecentlyDeletedModal,
  handleCloseRecentlyDeleted,
  recentlyDeletedTasks,
  setRecentlyDeletedTasks,
  tasks,
  setTasks,
}) {
  const filteredDeletedTask = recentlyDeletedTasks.filter(
    (tasks) => tasks.deletedAt !== null
  );
  const restoreTaskPermanently = (ID) => {
    const updatedTasks = recentlyDeletedTasks.map((task) =>
      task.id === ID ? { ...task, deletedAt: null } : task
    );
    document.getElementById(ID).classList.add("disintegrate");
    setTimeout(() => {
      setRecentlyDeletedTasks(updatedTasks);
      setTasks(updatedTasks);               // setTasks is done to modify Task on UI on the spot
    }, 1000);
    showToast("Task Restored Successfully", "green", "white");
  };
  const deleteTaskPermanently = (ID) => {
    document.getElementById(ID).classList.add("disintegrate");

    const updatedTasks = recentlyDeletedTasks.filter((task) => task.id !== ID);
    setTimeout(() => {
      setRecentlyDeletedTasks(updatedTasks);
      setTasks(updatedTasks);           // setTasks is done to modify Task on UI on the spot
    }, 1000);
    localStorage.setItem("taskArray", JSON.stringify(recentlyDeletedTasks));
    showToast("Task Deleted Permanently");
  };

  useEffect(() => {
    localStorage.setItem("taskArray", JSON.stringify(recentlyDeletedTasks));
  }, [recentlyDeletedTasks]);

  const { theme } = useContext(ThemeContext);
  const { showToast } = useContext(ToastContext);
  // console.log(theme, "gg");
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";

  return (
    <>
      <Modal
        show={showRecentlyDeletedModal}
        onHide={handleCloseRecentlyDeleted}
        centered
        className="backgroundTransparent"
      >
        <div
          className={`${modalBgColor} ${textColorClass} ConfirmModalColor modalBorderRadiusAndShadow p-3`}
        >
          <Modal.Header
            closeButton
            className={`${textColorClass} border-0 text-center`}
          >
            <Modal.Title className="text-center">
              Recently Deleted Tasks
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {filteredDeletedTask.length !== 0 ? (
              filteredDeletedTask.map((task) => (
                <div
                  key={task.id}
                  className="d-flex justify-content-between me-4"
                  id={task.id}
                >
                  {/* <p>ID: {task.id}</p> */}
                  <div style={{ maxWidth: "80%" }}>
                    <p className="fs-5">
                      <strong>{task.title}</strong>
                    </p>
                  </div>
                  <div>
                    <SlReload
                      size={25}
                      className="cursorPointer GreenModal"
                      onClick={() => restoreTaskPermanently(task.id)}
                    />
                    <MdDelete
                      size={25}
                      className="ms-3 cursorPointer RedModal"
                      onClick={() => deleteTaskPermanently(task.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center">No History Available</h4>
            )}
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default RecentltyDeletedModal;
