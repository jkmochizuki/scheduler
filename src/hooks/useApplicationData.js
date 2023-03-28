import { useEffect, useState } from "react";
import axios from "axios";
import {
  GET_APPOINTMENTS,
  GET_DAYS,
  GET_INTERVIEWERS,
} from "helpers/constants";

export default function useApplicationData() {
  /* state */
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /* sets the current day */
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  /* hook that fires only after the initial render, to load days, appointments, and interviewers */
  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  /* when an appointment is added or removed, it updates the number of spots remaining in that day */
  const updateSpots = (appointments, id) => {
    const day = state.days.find((day) => day.appointments.includes(id));
    const nullAppointments = day.appointments.filter(
      (appointmentId) => appointments[appointmentId].interview === null
    );
    const spots = nullAppointments.length;

    const days = state.days.map((d) =>
      d.appointments.includes(id) ? { ...d, spots } : d
    );

    return days;
  };

  /* makes an HTTP request and updates the local state when a new interview is booked */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointments[id]) // appointments[id] is the data to be sent to the server in the req.body
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments, id),
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  /* makes an HTTP request and updates the local state when an interview is canceled */
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointments[id])
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments, id),
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
