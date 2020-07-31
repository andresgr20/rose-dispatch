import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect, useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tasks.css';
import {tasks} from './tasks-data.js'
import {editContext} from './App'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  
export default function ModifyTasks() {
    const classes = useStyles();
    const {stateEdit, dispatchEdit} = useContext(editContext);
  const [open, setOpen] = useState(false);
  const [startTime,setStartTime] = useState(stateEdit.modifyTask.task.info.startTime);
  const [endTime,setEndTime] = useState(stateEdit.modifyTask.task.info.endTime);
  const [description,setDescription] = useState(stateEdit.modifyTask.task.info.description);
  const [location,setLocation] = useState(stateEdit.modifyTask.task.info.location);

  const handleClose = (event) => {
    setOpen(false);
    dispatchEdit({ type: 'modifyTask', payload: {show:false,task:{}}});
  };

  function handleDescriptionChange(e){
    setDescription(e.target.value);
}
function handleLocationChange(e){
    setLocation(e.target.value);
}

function handleStartTimeChange(e){
    setStartTime(e.target.value);
}

function handleEndTimeChange(e){
    setEndTime(e.target.value);
}

const submit = e =>{
    console.log('submitted');
}

  console.log(stateEdit.modifyTask.task);
  return (
    <Modal
          show={stateEdit.modifyTask.show}
          animation={true}
          onHide={() => setOpen(stateEdit.modifyTask.show)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
            Adding a task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
                  <label>
                      {/* Name: {stateEdit.modifyTask.info.name} */}
                  </label>
                  <label>
                      {/* Driver: {stateEdit.modifyTask.info.driver} */}
                      </label>
                  <label>
                      Type
                    </label>
                    <RadioGroup aria-label="task" name="task" value={"pickup"}row>
                        <FormControlLabel value={"pickup"} disabled control={<Radio />} label="Pick Up" />
                        <FormControlLabel value={"dropoff"} disabled control={<Radio />} label="Drop Off" />
                        <FormControlLabel value={"other"} disabled  control={<Radio />} label="Other" />
                    </RadioGroup>
                  <label>
                      Location:
                      </label>
                      <input type="text" name="locationName" value={location} onChange={handleLocationChange}></input>

                  {/* <label> Date: {stateEdit.modifyTask.task.info.taskDate}</label> */}

                  <label>
                     Start Time
                     </label>
                     <TextField
                        value={startTime}
                        label="Start Time"
                        type="integer"
                        defaultValue={startTime}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleStartTimeChange}
                        required
                    />

                  <label>
                     End Time
                     </label>
                     <TextField
                        value={endTime}
                        label="End Time"
                        type="integer"
                        defaultValue={endTime}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleEndTimeChange}
                        required
                    />

                  <label>
                      Description:
                      </label>
                      <textarea type="text" name="locationName" value={description} onChange={handleDescriptionChange} required></textarea>
                  <button  onClick={handleClose}>Cancel</button>
                  <button>Delete</button>
                  <button  onClick={submit} className="formButton" >Apply</button>
          </Modal.Body>
          <Modal.Footer>
              </Modal.Footer>
        </Modal>
  );
  }


  