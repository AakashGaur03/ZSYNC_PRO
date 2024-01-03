import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AudioPlayer from '../Audio/AudioPlayer';

// Props coming from NavbarComp
function SoundModal({showSoundModal,handleCloseSoundModal,handleUpdateSoundModal,currentSound ,setCurrentSound ,handleRadioChange,selectedSound,setSelectedSound}) {

  return (
    <>
      <Modal show={showSoundModal} onHide={handleCloseSoundModal} centered size='lg' className='SoundModalSize'>
        <Modal.Body>
            <AudioPlayer
            currentSound={currentSound}
            setCurrentSound={setCurrentSound}
            handleRadioChange={handleRadioChange}
            selectedSound={selectedSound}
            setSelectedSound={setSelectedSound}
            />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSoundModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSoundModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SoundModal;