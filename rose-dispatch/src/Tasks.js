import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tasks.css';
import Select from '@material-ui/core/Select';
import {tasks} from './tasks-data.js'
import MenuItem from '@material-ui/core/MenuItem';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';

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

//   function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
//   }
export default function Tasks() {
    var id = 7;
    function idgen(){return id++};
    const [show, setShow] = useState(false);
    const [taskName,setName] = useState('Name of the task');
    const [driver,setDriver] = useState('Placeholder');
    const [location,setLocation] = useState('Set Location');
    const [taskType,setTaskType] = useState('pickup');
    const [taskDate,setDate] = useState(new Date().getDate());
    const [startTime,setStartTime] = useState(new Date().getHours());
    const [endTime,setEndTime] = useState('End');
    const [description,setDescription] = useState('Jump rope');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    // useEffect(() => {
    //     document.Modal.Title = taskName;
    // });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const submit = e =>{
        //true would be replanced by checking the conflict scheudle
        e.preventDefault();
        if(true){
            tasks.push(
                {"id":idgen(),
            "info":{
                "name":taskName,
                "driver":driver,
                "location":location,
                "type":taskType,
                "date":taskDate,
                "startTime":startTime,
                "endTime":endTime,
                "description":description

            }}
            )
            console.log(tasks);
            setShow(false);
        }else{
            //trigger other popup
        }
    }

    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    function handleDriverChange(e){
        setDriver(e.target.value);
    }

    function handleLocationChange(e){
        setLocation(e.target.value);
    }

    function handleStartTimeChange(e){
        setStartTime(e.target.value);
    }

    function handleTaskType(e){
        setTaskType(e.target.value);
    }
    function handleEndTimeChange(e){
        setEndTime(e.target.value);
    }

    function handleDateChange(e){
        setDate(e.target.value);
    }

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Tasks
      </Button>
        <Modal
          show={show}
          animation={true}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={submit}>
                  <h3 className="title">Adding a task</h3>
                  <label>
                      Name:
                      <input 
                      type="text" 
                      name="taskName" 
                      value={taskName} 
                      onChange={handleNameChange} required>
                      </input>
                  </label>
                  <label>
                      Driver:
                      <Select
                        value={driver}
                        onChange={handleDriverChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        >
                        <MenuItem value="" disabled>
                            {driver}
                        </MenuItem>
                        <MenuItem value={"Jojo Rabbit"}>Jojo Rabbit</MenuItem>
                        <MenuItem value={"Katherine Johnson"}>Katherine Johnson</MenuItem>
                        <MenuItem value={"Susana Roberta"}>Susana Roberta</MenuItem>
                        </Select>
                  </label>
                  <label>
                      Description:
                      <input type="text" name="locationName" value={description} onChange={handleDescriptionChange} required></input>
                  </label>
                  <label>
                      Type
                    <RadioGroup aria-label="task" name="task" value={taskType} onChange={handleTaskType}>
                        <FormControlLabel value="pickup" control={<Radio />} label="Pick Up" />
                        <FormControlLabel value="dropoff" control={<Radio />} label="Drop Off" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </label>
                  <label>
                      Location:
                      <input type="text" name="locationName" value={location} onChange={handleLocationChange}></input>
                  </label>
                  <label>
                      Date
                    <TextField
                        id="date"
                        value={taskDate}
                        label="taskDate"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleDateChange}
                        required
                    />
                  </label>
                  <label>
                     Start Time
                     <TextField
                        id="time"
                        value={startTime}
                        label="Start Date"
                        type="integer"
                        defaultValue="2"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        onChange={handleStartTimeChange}
                        required
                    />
                  </label>
                  <label>
                     End Time
                     <TextField
                        id="time"
                        value={endTime}
                        label="Start Date"
                        type="time"
                        defaultValue="07:30"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        onChange={handleEndTimeChange}
                        required
                    />
                  </label>
                  <button onClick={handleClose}>Cancel</button>
                  <button onClick={submit}>Apply</button>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
