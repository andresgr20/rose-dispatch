import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect,useContext} from "react"; 
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
import {taskContext} from './App';
import { letterSpacing } from '@material-ui/system';

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



export default function Tasks() {
    var start = 0;
    var end = 0;
    const {state, dispatch} = useContext(taskContext);
    var id = 8;
    function idgen(){return id++};
    const [showForm, setShowForm] = useState(false);  
    const [open, setOpen] = useState(false);
    const [taskName,setName] = useState('Name of the task');
    const [driver,setDriver] = useState('Jojo Rabbit');
    const [location,setLocation] = useState('Set Location');
    const [taskType,setTaskType] = useState('pickup');
    const [taskDate,setDate] = useState(new Date().getDate());
    const [startTime,setStartTime] = useState(3);
    const [endTime,setEndTime] = useState(18);
    const [description,setDescription] = useState('');
    const classes = useStyles();

    // useEffect(() => {
    //     document.Modal.Title = taskName;
    // });

    const handleClose = () => {
        resetForm();
        setShowForm(false);
    };

    const handleShow = () => setShowForm(true);

    function checkConflicts(events){
        for(var i=0;i<events.length;i++){
            if((events[i].info.startTime < startTime) && events[i].info.endTime> endTime){
                console.log('conflict');
                return true;
            }
        }
        return false;
    }
    
    function fixConflict(schedule){
        var dur = endTime - startTime;
        var cdur = dur;
        for(var i = 0; i<24 || cdur === dur;i++){
            if(schedule[i] === 0 && cdur === dur){
                cdur--;
                start = i;
            }else if(schedule[i] === 0){
                cdur--;
            }else{
                cdur = dur;
            }
        }
        if(cdur === 0){
            end = start + dur;
            tasks.push(
                {"id":idgen(),
            "info":{
                "name":taskName,
                "driver":driver,
                "location":location,
                "type":taskType,
                "date":taskDate,
                "startTime":start,
                "endTime":end,
                "description":description
            }})
            dispatch({
                type: 'show',
                payload: true
            });
            dispatch({
                type: "allEvents",
                payload: tasks
            });
            return true;
        }
        return false;
        }

        function removeTask(task){
            var index = 0;
            for(var i = 0; i<tasks.length;i++){
                if(task.id === tasks[i].id){
                    index=i;
                    break;
                }
            }
            if (index > -1) {
              tasks.splice(index, 1);
            }
        }
    function overwriteConflict(events){
        for(var i=0;i<events.length;i++){
            if((events[i].info.startTime < startTime) && events[i].info.endTime> endTime){
                removeTask(events[i]);
            }
        }
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
        }})
        dispatch({
            type: 'show',
            payload: true
        });
        dispatch({
            type: "allEvents",
            payload: tasks
        });

    }
    const submit = e =>{
        var events = []
        tasks.forEach((task)=>{
            if(task.info.driver === driver && task.info.date===taskDate){
                events.push(task);
            }
        })
        events.sort((a,b) => a.info.startTime < b.info.startTime);
        //true would be replanced by checking the conflict scheudle
        e.preventDefault();
        if(false){
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
            dispatch({
                type: "allEvents",
                payload: tasks
            });
            dispatch({
                type: 'show',
                payload: true
            })
            setOpen(true);
            resetForm()
            console.log(tasks);
            setShowForm(false);
        }else{
            const schedule = []
            for(var i =0;i<24;i++){
                var e = {};
                e[i] = 0
                schedule.push(e);
            }
            events.forEach((task)=>{
                schedule[task.info.startTime]= 1;
                var r =  task.info.endTime - task.info.startTime;
                for(var i =0; i<r;i++){
                    schedule[r-i]=1
                }
            });
            console.log('conflict');
            fixConflict(schedule);
            overwriteConflict(schedule,events);
            dispatch({
                type: 'showConflict',
                payload: true
            })
        }
    }

    function resetForm(){
        setName('Name of the task');
        setDriver('Jojo Rabbit');
        setDate('');
        setStartTime(2);
        setEndTime(18);
        setDescription('');
        setTaskType('pickup');
        setLocation('');
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
          show={showForm}
          animation={true}
          onHide={() => setShowForm(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
            Adding a task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
              <form onSubmit={submit} className="form">
                  <div className="taskBar">
                  <label>
                      Name:
                  </label>
                  <TextField
                      type="text" 
                      name="taskName" 
                      value={taskName} 
                      onChange={handleNameChange} required>
                      </TextField>
                  </div>
                  <label>
                      Driver:
                      </label>
                      <Select
                        value={driver}
                        onChange={handleDriverChange}
                        >
                        <MenuItem value={"Jojo Rabbit"}>Jojo Rabbit</MenuItem>
                        <MenuItem value={"Katherine Johnson"}>Katherine Johnson</MenuItem>
                        <MenuItem value={"Susana Roberta"}>Susana Roberta</MenuItem>
                        </Select>
                  <label>
                      Type
                    </label>
                    <RadioGroup aria-label="task" name="task" value={taskType} onChange={handleTaskType} row>
                        <FormControlLabel value={"pickup"} control={<Radio />} label="Pick Up" />
                        <FormControlLabel value={"dropoff"} control={<Radio />} label="Drop Off" />
                        <FormControlLabel value={"other"} control={<Radio />} label="Other" />
                    </RadioGroup>

                  <label>
                      Location:
                      </label>
                      <input type="text" name="locationName" value={location} onChange={handleLocationChange}></input>

                  <label>
                      Date
                      </label>
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
                  <button  onClick={handleClose} className="formButton">Cancel</button>
                  <button  onClick={submit} className="formButton" >Apply</button>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
