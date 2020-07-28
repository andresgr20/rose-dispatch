import React from 'react';
import FullCalendar from '@fullcalendar/react'
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

export function Calendar({}){
    const events = [{ id: 1, title: "Event Now", start: new Date(), end: '2020-07-28 18:00:00' },{ id: 2,     title: 'Random Event 1',
    start: moment().add(-4, 'h'),
    end: moment().add(-2, 'h'),
    allDay: false }];

    return (<>
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
        events={events}
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
