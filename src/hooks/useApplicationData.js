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
    /* empty dependency because API request does not depend on the state or props of this component => never rerun this request */
  }, []);

  /* makes an HTTP request and updates the local state when a new interview is booked */
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointments[id]) // appointments[id] is the data to be sent to the server in the req.body
      .then((res) => {
        setState({ ...state, appointments });
      });
  }

  /* makes an HTTP request and updates the local state when an interview is canceled */
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointments[id])
      .then((res) => {
        setState({ ...state, appointments });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
