import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RecentltyDeletedModal({showRecentlyDeletedModal,handleCloseRecentlyDeleted,handleShowRecentlyDeletedModal}) {

  return (
    <>

      <Modal show={showRecentlyDeletedModal} onHide={handleCloseRecentlyDeleted} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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