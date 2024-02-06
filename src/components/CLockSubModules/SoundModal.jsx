import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "../Audio/AudioPlayer";
import ThemeContext from "../../Contexts/ThemeContext";

// Props coming from NavbarComp
function SoundModal({
  showSoundModal,
  handleCloseSoundModal,
  handleUpdateSoundModal,
  SetCurrentSoundParent,
  currentSound,
  setCurrentSound,
  handleRadioChange,
  selectedSound,
  setSelectedSound,
  sounds,
}) {
  const { theme } = useContext(ThemeContext);
  console.log(theme, "gg");
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";

  return (
    <>
      <Modal
        show={showSoundModal}
        onHide={handleCloseSoundModal}
        centered
        size="lg"
        className="SoundModalSize"
      >
        <div className={`${modalBgColor} ${textColorClass} ConfirmModalColor`}>
          <Modal.Body>
            <AudioPlayer
              currentSound={currentSound}
              setCurrentSound={setCurrentSound}
              handleRadioChange={handleRadioChange}
              selectedSound={selectedSound}
              setSelectedSound={setSelectedSound}
              SetCurrentSoundParent={SetCurrentSoundParent}
              sounds={sounds}
            />
          </Modal.Body>

          <Modal.Footer className="border-0">
            <Button variant="secondary" className="CloseModal" onClick={handleCloseSoundModal}>
              Close
            </Button>
            <Button variant="primary" className="saveEditModal" onClick={handleUpdateSoundModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default SoundModal;
