import React, {useContext,useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import { tasks } from "./tasks-data";
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

export function Calendar({}){
    // const { tasks } = useContext(TaskContext);
    const [driver,setDriver] = useState('Jojo Rabbit');
    function handleDriverChange(e){
        setDriver(e.target.value);

    }
    function determineCalendar(driver){
        var events = []
        tasks.forEach((task)=>{
            if(task.info.driver === driver){
                console.log('hi')
                events.push({
                    "id":task.id,
                    "title":task.info.name,
                    "start":new Date(task.info.date + " " + task.info.startTime+":00"),
                    "end":new Date(task.info.date + " " + task.info.endTime+":00")
                })
            }
        })
        // console.log(events);
        return events;
    };
    const myevents = determineCalendar(driver);
    const classes = useStyles();
    //     const events = [{ id: 1, title: "Event Now", start: new Date(), end: '2020-07-28 18:00:00' },
//     {id: 2, title: "Event Now", start: new Date("2020-07-28 12:00"), end: '2020-07-28 20:00:00'} 
// ];
    return (<>
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
        <h1> Calendar</h1> 
        {true &&  <FullCalendar
        initialView="timeGridWeek"
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek,timeGridWeek,timeGridDay,listWeek"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        //ref={this.calendarComponentRef}
        weekends={true}
        events={myevents}
        droppable={true}
        eventColor= {'#378006'}
        slotDuration={'00:30:00'}
        displayEventEnd={true}
        eventRender={info => {
            console.log(new Date())
          // console.log(info);
          // console.log(eventRefs, info.el, info.event.id);
          // if (!eventRefs[info.event.id]) {
          //   setEventRefs({
          //     ...eventRefs,
          //     [info.event.id]: info.el
          //   });
          // }
        }}
      />}
    </>
        );
}
