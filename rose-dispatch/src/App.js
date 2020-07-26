import React from 'react';
import logo from './logo.png';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import './App.css';
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

function App() {

var Calendar = require('tui-calendar'); /* CommonJS */
require("tui-calendar/dist/tui-calendar.css");

// If you use the default popups, use this.
require("tui-date-picker/dist/tui-date-picker.css");
require("tui-time-picker/dist/tui-time-picker.css");

var calendar = new Calendar('#calendar', {
  defaultView: 'month',
  taskView: true,
  template: {
    monthDayname: function(dayname) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
  }
});

calendar.changeView('week',true);

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
          <Button> Add task</Button>  
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
      <button>Download</button> 
      {/* // pop up to select range turn the current calendar into csv  */}

      <div id="calendar"></div>
    </div>
  );
}

export default App;
