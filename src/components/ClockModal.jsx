import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ClockData from './ClockData';

function ClockModal({showClockModal,handleCloseClockModal ,handleUpdateClockModal}) {


  return (
    <>
      <Modal show={showClockModal} onHide={handleCloseClockModal} centered>
        <Modal.Body>
            <ClockData Clock1 Clock2/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClockModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateClockModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ClockModal;