import React, {useState,useCallback,useContext} from "react"; 
import Modal from 'react-bootstrap/Modal';
import {taskContext} from './App';
import ListGroup from 'react-bootstrap/ListGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {tasks} from './tasks-data';
import {editContext} from './App';
// import ModifyTasks from "./ModifyTasks";

export default function ListTasks() {
    const {stateEdit, dispatchEdit} = useContext(editContext);
    const [show, setShow] = useState(false);
    const [driverSelect,setDriverSelect] = useState('');
    const allTasks = [];
    const handleDriverSelect=(e)=>{
        console.log(e);
        setDriverSelect(e);
      }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getList(){
        console.log(driverSelect);
        console.log(tasks);
        tasks.forEach((task)=>{
            if(task.info.driver === driverSelect){
                allTasks.push(task);
            }
        })
    }

  const itemClickHandler = useCallback((e) => {
      console.log(e);
      const item = {show:true,task:e};
    dispatchEdit({
        type: 'modifyTask',
        payload: item
    });
    console.log('dispatch');
  }, [])

    getList();
    return (
      <>
      <DropdownButton
      onSelect={handleDriverSelect} id="dropdown-basic-button" title="View Tasks">
  <Dropdown.Item eventKey="Jojo Rabbit" onClick={handleShow}>Jojo Rabbit</Dropdown.Item>
  <Dropdown.Item eventKey="Katherine Johnson" onClick={handleShow}>Katherine Johnson</Dropdown.Item>
  <Dropdown.Item eventKey="Susana Roberta" onClick={handleShow} >Susana Roberta</Dropdown.Item>
</DropdownButton>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select one of {driverSelect}'s tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <ListGroup>
        {allTasks.map((task,key)=>{
            return <ListGroup.Item action onClick={() => itemClickHandler(task)} variant={task.info.type==='dropoff' ? "light": task.info.type==='pickup'? "info":'dark'}>{task.info.date}: {task.info.startTime} to {task.info.endTime}, {task.info.type}  </ListGroup.Item>;
        })}
</ListGroup></Modal.Body>
        </Modal>
        {/* <ModifyTasks/> */}
      </>
    );
}