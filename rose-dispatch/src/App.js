import React, { useState, useEffect,createContext,useReducer } from 'react';
import logo from './logo-grey.png';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import './App.css';
import Tasks from './Tasks.js';
import driversData from './drivers-data.json';
import {Calendar} from './Calendar.js'
import { tasks } from './tasks-data';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PopUpSnack from './PopUpSnack';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "allEvents":
      return { ...state, allEvents: action.payload };
    case 'show':
      return {...state, show: action.payload}
    default:
      return state;
  }
};

// Set up Initial State
const INITIAL_STATE = {
  allEvents: tasks,
  show: false
};

export const taskContext = createContext();
export const driverContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const classes = useStyles();
  const [period,setPeriod] = useState(2);
  const [driver,setDriver] = useState('Jojo Rabbit');

  function handleDriverChange(e){
    setDriver(e.target.value);

}

function addDays(date) {
  var result = new Date(date);
  result.setDate(result.getDate() + period);
  var dateString = [result.getFullYear(),"-",result.getMonth()+1,"-",result.getDate()].join('');
  return dateString;
}

 
function checkDatesRange(d1,d2,d3){
  var dateFrom = d1;
  var dateTo = addDays(d1);
  var dateCheck = d3;
  
  var d1 = dateFrom.split("-");
  var d2 = dateTo.split("-");
  var c = dateCheck.split("-");
  
  var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
  var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
  var check = new Date(c[2], parseInt(c[1])-1, c[0]);
  return check >= from && check < to;
}

  function exportCSV(){
    var driverTasks = []
    tasks.forEach((task)=>{
      if(task.info.driver === driver){
          driverTasks.push(task)
      }
  })
  console.log(driverTasks)
    driverTasks.sort((a, b) => new Date(a.info.date)  - new Date(b.info.date));
    console.log(driverTasks)
    const csvRow = [];
    const data = [["Time-Frame","Pickup", "Drop-off", "Other"]];
    var pickup=0;
    var dropoff=0;
    var other=0;
    var initDay = driverTasks[0].info.date;
    var periodClose = addDays(initDay);
    var row = 0;
    switch(driverTasks[0].info.type){
      case 'pickup':
        pickup++;
        break;
      case 'dropoff':
        dropoff++;
        break;
      default:
        other++;
    }
for(var i = 1; i<driverTasks.length;i++){
  while(!checkDatesRange(initDay,periodClose,driverTasks[i].info.date)){
    console.log(driverTasks[i].info.date);
    data.push(['Day '+ (1+period*row) +' - Day '+ (1+period*(row+1)),pickup,dropoff,other])
    row++;
    pickup = 0;
    dropoff=0;
    other=0;
    initDay= periodClose;
    periodClose = addDays(periodClose);
  }
  switch(driverTasks[0].info.type){
    case 'pickup':
      pickup++;
      break;
    case 'dropoff':
      dropoff++;
      break;
    default:
      other++;
  }
  initDay= addDays(periodClose);
  if(driverTasks.length-1 === i){
    data.push(['Day '+ (1+period*row) +' - Day '+ (1+period*(row+1)),pickup,dropoff,other])
  }

}
    console.log(data);
    data.forEach((row) => {
      csvRow.push(row.join(','));
    })
    console.log(data);
  
    var csvString=csvRow.join('%0A');
    console.log(csvString);
    var a = document.createElement("a");
    a.href='data:attachment/csv,'+csvString;
    a.target="_Blank";
    a.download= driver+"'s Report - "+ period+ " Day Period.csv";
    document.body.appendChild(a);
    a.click();
  }

  function handlePeriodChange(e){
    setPeriod(e.target.value);
  }
  
  return (
    <div className="App">
        <nav className="navBar">
          <img src={logo} className="logo" alt="logo" />
          <ul className="barButtons">
            <li>
                      {/* // Used to update the list of drivers. It will popup to change the driver info (email, name, contact ), create a new one or delete a driver */}
                  <Dropdown as={ButtonGroup}>
                <Button variant="success">Add Driver</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">John Mask</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Andres Me</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Grace Science</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
            <taskContext.Provider value={{state,dispatch}}>
            <Tasks/>
            <PopUpSnack/>
           </taskContext.Provider>

          {/* // Create a new task for  a user, if there is a conflict with a task it will recommned another driver or another time for the same driver 
          // A task should have Driver, Type, time duration, Description, Location,nationality
          // after adding sends and invite to the person in the email
          // pick up, drop off, other are drop down (if selects pick up or drop off input address) other is blank */}
        </li>
          </ul>
          </nav>

      {/* // Maybe add a text notif when a task is added or email  


      //Have drop down with drivers here can use react native. This will change the calendar */}
      {/* <button>Email</button>  */}
      {/* // Will email the calendar as a pdf to the driver based on the contact info for a week */}
      {/* // turn into pdf and print calendar for the week */}
      {/* <button>Print</button>  */}
      {/* // Dropdown setting the download period */}
            <Select
            value={driver}
            onChange={handleDriverChange}
            >
            <MenuItem value={"Jojo Rabbit"}>Jojo Rabbit</MenuItem>
            <MenuItem value={"Katherine Johnson"}>Katherine Johnson</MenuItem>
            <MenuItem value={"Susana Roberta"}>Susana Roberta</MenuItem>
            </Select>
      <Select
            value={period}
            onChange={handlePeriodChange}
            className={classes.selectEmpty}
            >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={28}>28</MenuItem>
            </Select>
      <button onClick={exportCSV}>Download</button> 
      {/* // pop up to select period turn the current calendar into csv  */}
      <taskContext.Provider value={{state,dispatch}}>
      <Calendar /> 
      </taskContext.Provider>
    </div>
  );
}

export default App;
