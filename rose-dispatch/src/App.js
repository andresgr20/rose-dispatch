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


function App() {
  function exportCSV(){
    var range = 2;
    var driver = "Jojo Rabbit";
    console.log('export');
    console.log('hi from export')
    // separate somewhere else
    var driverTasks = []
    tasks.forEach((task)=>{
      if(task.info.driver === driver){
          console.log('filtering driver')
          driverTasks.push(task)
      }
  })
    // var driverTasks = tasks.filter((index) =>{
    //   console.log(tasks[index-1]);
    //   // return index === 0 || driver !== tasks[index-1].info.driver;
    // });
    driverTasks.sort((a, b) => b.info.date - a.info.date);
    console.log(driverTasks);
    const csvRow = [];
    const data = [["Time-Frame","Pickup", "Drop-off", "Other"]];
    console.log(driverTasks);
    var day,cday = 1;
    var pickup=0;
    var dropoff=0;
    var other=0;
    switch(driverTasks[0].info.type){
      case 0:
        pickup++;
        break;
      case 1:
        dropoff++;
        break;
      default:
        other++;
    }
    for(var i = 1; i< driverTasks.length;i++){
        switch(driverTasks[i].info.type){
        case 0:
          pickup++;
          break;
        case 1:
          dropoff++;
          break;
        default:
          other++;
      }
      data.push(['Day '+ cday - range +' - Day '+ cday,pickup,dropoff,other])
      // if(driverTasks[i].info.date > driverTasks[i-1].info.date){
      //   day++;
      //   cday++;
      //   if(day === range+1 || i === driverTasks.length-1){
      //     data.push(['Day '+ cday - range +' - Day '+ cday,pickup,dropoff,other])
      //     pickup=0;
      //     dropoff=0;
      //     other=0;
      //     day=1;
      //   }
      // }
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
    a.download= driver+"'s Report - "+ range+ " Day Period.csv";
    document.body.appendChild(a);
    a.click();
    console.log('appended');
  
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
      <button>Email</button> 
      {/* // Will email the calendar as a pdf to the driver based on the contact info for a week */}
      {/* // turn into pdf and print calendar for the week */}
      <button>Print</button> 
      {/* // Dropdown setting the download range */}
      <button onClick={exportCSV}>Download</button> 
      {/* // pop up to select range turn the current calendar into csv  */}
      <Calendar /> 
    </div>
  );
}

export default App;
