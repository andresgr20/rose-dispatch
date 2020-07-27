import Modal from 'react-bootstrap/Modal';

function TaskFail() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title></Modal.Title> */}
          </Modal.Header>
          <Modal.Body>There has been a time conflict in the schedule!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Change Driver
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Pick me another time
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}