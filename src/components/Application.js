import React, { useEffect, useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { GET_APPOINTMENTS, GET_DAYS, GET_INTERVIEWERS } from "helpers/constants";

export default function Application() {
  
  /* combines all of the state into a single object */
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  })

  /* action to update day state */
  const setDay = day => setState(prev => ({ ...prev, day }));

  /* request as a side effect to update the component when days, appointments, and interviewers data is retrieved */
  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})) // set the days, appointments, and interviewers state at the same time
      })
      .catch((err) => {
        console.log(err.response);
      });
      /* empty dependency because API request does not depend on the state or props of this component => never rerun this request */
  }, []) 

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
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
        {schedule}
      </section>
      
    </main>
  );
}