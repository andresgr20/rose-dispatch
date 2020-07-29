import React, { useState, useEffect } from 'react';
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [period,setPeriod] = useState(2);
  const [driver,setDriver] = useState('Jojo Rabbit');

  function handleDriverChange(e){
    setDriver(e.target.value);

}

function dateDiff(date1,date2){
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
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
    var day = 1;
    var pickup=0;
    var dropoff=0;
    var other=0;
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
    var row = 0;
    for(var i = 1; i< driverTasks.length;i++){
      const diffDays = dateDiff(driverTasks[i-1].info.date,driverTasks[i].info.date);
      const emptyPeriod = Math.ceil(diffDays/period)-1;
      if(emptyPeriod === 0){
        for(var i = 0; i<emptyPeriod;i++){
          pickup = 0;
          dropoff=0;
          other=0;
          data.push(['Day '+ (1+period*row) +' - Day '+ (1+period*(row+1)),pickup,dropoff,other]) 
          row++;       
        }
        day=diffDays-row*period;
      }
      if(diffDays === 0){
        switch(driverTasks[i].info.type){
          case 'pickup':
          pickup++;
          break;
        case 'dropoff':
          dropoff++;
          break;
        default:
          other++;
        }
      }else if(diffDays===1 && day-period !== 0){
        day++;
        switch(driverTasks[i].info.type){
          case 'pickup':
          pickup++;
          break;
        case 'dropoff':
          dropoff++;
          break;
        default:
          other++;
      }
    } else if(day - period === 0 || i === driverTasks.length-1){
      data.push(['Day '+ (1+period*row) +' - Day '+ (1+period*(row+1)),pickup,dropoff,other]) 
      row++;
      pickup=0;
      dropoff=0;
      other=0;
      day=1;
    }else{

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
            <Tasks></Tasks>

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
      <Calendar /> 
    </div>
  );
}

export default App;
