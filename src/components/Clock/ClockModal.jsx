import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ClockData from './ClockData';
import  ThemeContext  from "../../Contexts/ThemeContext";

// props coming from NavbarComp.jsx
function ClockModal({showClockModal,handleCloseClockModal ,handleUpdateClockModal}) {

  const { theme } = useContext(ThemeContext);
  // console.log(theme,"gg")
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const btnColor = theme === "Light" ? "btnLightTheme" : "btnDarkTheme";
  
  return (
    <>
      <Modal show={showClockModal} onHide={handleCloseClockModal} centered className="backgroundTransparent">
        <div className={`${modalBgColor} ${textColorClass} ConfirmModalColor modalBorderRadiusAndShadow p-3`}  >

        <Modal.Body>
            <ClockData Clock1 Clock2 Clock3/>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="danger" className='RedModal' onClick={handleCloseClockModal}>
            Close
          </Button>
          <Button variant="primary" className={`GreenModal ${btnColor}`} onClick={handleUpdateClockModal}>
            Save Changes
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ClockModal;