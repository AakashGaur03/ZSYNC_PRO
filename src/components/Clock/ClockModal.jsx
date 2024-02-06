import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ClockData from './ClockData';
import  ThemeContext  from "../../Contexts/ThemeContext";

// props coming from NavbarComp.jsx
function ClockModal({showClockModal,handleCloseClockModal ,handleUpdateClockModal}) {

  const { theme } = useContext(ThemeContext);
  console.log(theme,"gg")
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  
  return (
    <>
      <Modal show={showClockModal} onHide={handleCloseClockModal} centered>
        <div className={`${modalBgColor} ${textColorClass}`}  >

        <Modal.Body>
            <ClockData Clock1 Clock2/>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleCloseClockModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateClockModal}>
            Save Changes
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ClockModal;