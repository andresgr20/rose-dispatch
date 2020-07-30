import React, { useContext} from "react"; 
import Modal from 'react-bootstrap/Modal';
import {taskContext} from './App';
import Button from 'react-bootstrap/Button'

export default function ConflictPopUp() {
  const {state, dispatch} = useContext(taskContext);
    const handleClose = () => {
      dispatch({ type: 'showConflict', payload: false});
    };

    function handleConflict(){
      dispatch({ type: 'show', payload: false});
      dispatch({ type: 'fixConflict', payload: true});
      dispatch({ type: 'showConflict', payload: false});
    }
    function handleOverwrite(){
      dispatch({ type: 'show', payload: false});
      dispatch({ type: 'overwriteConflict', payload: true});
      dispatch({ type: 'showConflict', payload: false});
    }
    return (
      <>
        <Modal show={state.showConflict} onHide={handleClose}>
          <Modal.Header closeButton>
          There has been a time conflict!
          </Modal.Header>
          <Modal.Body>Please pick what you would like to do?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConflict}>
              Pick a new time for me
            </Button>
            <Button variant="primary" onClick={handleOverwrite}>
              Overwrite conflict
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}