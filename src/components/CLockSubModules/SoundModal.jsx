import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AudioPlayer } from "../index";
import { ThemeContext } from "../../Contexts";

// Props coming from NavbarComp
function SoundModal({
  showSoundModal,
  handleCloseSoundModal,
  handleUpdateSoundModal,
  handleRadioChange,
  selectedSound,
  setSelectedSound,
  sounds,
}) {
  const { theme } = useContext(ThemeContext);
  // console.log(theme, "gg");
  const modalBgColor = theme === "Light" ? "backgroundLight" : "backgroundDark";
  const textColorClass = theme === "Light" ? "text-black" : "text-white";
  const btnColor = theme === "Light" ? "btnLightTheme" : "btnDarkTheme";

  return (
    <>
      <Modal
        show={showSoundModal}
        onHide={handleCloseSoundModal}
        centered
        size="lg"
        className="backgroundTransparent"
        backdrop="static"
        keyboard={false}
      >
        <div
          className={`${modalBgColor} ${textColorClass} ConfirmModalColor modalBorderRadiusAndShadow`}
        >
          <Modal.Body>
            <AudioPlayer
              handleRadioChange={handleRadioChange}
              selectedSound={selectedSound}
              setSelectedSound={setSelectedSound}
              sounds={sounds}
            />
          </Modal.Body>

          <Modal.Footer className="border-0 pe-4 pb-3">
            <Button
              variant="danger"
              className="RedModal"
              onClick={handleCloseSoundModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={`GreenModal ${btnColor}`}
              onClick={handleUpdateSoundModal}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default SoundModal;
