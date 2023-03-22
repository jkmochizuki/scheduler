import React, { useEffect, useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  },
  "6": {
    id: 6,
    time: "5pm",
  }
};

const appointmentList = Object.values(appointments).map((appointment) => {
  return (
    <Appointment
      key={appointment.id}
      {...appointment}
    />
  )
})

export default function Application(props) {
  const [day, setDay] = useState('');
  const [days, setDays] = useState([]);

  /* request as a side effect to update the component when days data is retrieved */
  useEffect(() => {
    axios
      .get('http://localhost:8001/api/days') 
      .then((response) => {
        console.log(response.data);
        setDays([...response.data])
      })
      .catch((err) => {
        console.log(err.response);
      });
      /* empty dependency because API request does not depend on the state or props of this component => never rerun this request */
  }, []) 

  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentList}
      </section>
      
    </main>
  );
}


