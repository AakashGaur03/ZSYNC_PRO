import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ClockData from "./ClockData";

const ClockModal = ({
  activeClock,
  setActiveClock,
  showClockModal,
  handleCloseClockModal,
  handleUpdateClockModal,
}) => {
  return (
    <>
      <Modal show={showClockModal} onHide={handleCloseClockModal} centered>
        <Modal.Body className="d-flex flex-column align-self-center">
          <ClockData
            activeClock={activeClock}
            setActiveClock={setActiveClock}
          />
        </Modal.Body>
        <div className="d-flex justify-content-end p-3">
          <Button
            className="me-3"
            variant="primary"
            onClick={() => handleCloseClockModal(activeClock)}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => handleUpdateClockModal(activeClock)}
          >
            Update
          </Button>
        </div>
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ClockModal;
