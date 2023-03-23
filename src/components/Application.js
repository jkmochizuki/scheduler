import React, { useEffect, useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
import { GET_APPOINTMENTS, GET_DAYS } from "helpers/constants";

export default function Application(props) {
  
  /* combines all of the state into a single object */
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {}
  })

  /* action to update day state */
  const setDay = day => setState(prev => ({ ...prev, day }));

  /* request as a side effect to update the component when days and appointments data is retrieved */
  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS)
    ]).then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data})) // set the days and appointments state at the same time
      })
      .catch((err) => {
        console.log(err.response);
      });
      /* empty dependency because API request does not depend on the state or props of this component => never rerun this request */
  }, []) 

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = Object.values(dailyAppointments).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    )
  })

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
            days={state.days}
            value={state.day}
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


