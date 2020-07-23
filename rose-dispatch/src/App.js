import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <ul className="topLinks">
        <li>
          <a href=""> Update Drivers</a>  // Used to update the list of drivers. It will popup to change the driver info (email, name, contact ), create a new one or delete a driver
        </li>
        <li>
          <a href=""> Add task</a>  // Create a new task for  a user, if there is a conflict with a task it will recommned another driver or another time for the same driver 
          // A task should have picture,Driver, Type, time duration, Description, Location,nationality
          // after adding sends and invite to the person in the email
          // pick up, drop off, other are drop down (if selects pick up or drop off input address) other is blank
        </li>
      </ul>

      // Maybe add a text notif when a task is added or email  


      //Have drop down with drivers here can use react native. This will change the calendar
      <button>Email</button> // Will email the calendar as a pdf to the driver based on the contact info for a week
      <button>Print</button> // turn into pdf and print calendar for the week
      // Dropdown setting the download range
      <button>Download</button> // pop up to select range turn the current calendar into csv 

      // Calendar will be here 
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
