import { useEffect, useReducer } from "react";
import { reducer } from "reducers/application";
import {
  GET_APPOINTMENTS,
  GET_DAYS,
  GET_INTERVIEWERS,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "helpers/constants";
import axios from "axios";

export default function useApplicationData() {
  /* state */
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /* sets the current day */
  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  /* hook that fires only after the initial render, to load days, appointments, and interviewers */
  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ])
      .then((all) => {
        dispatch({ type: SET_APPLICATION_DATA, value: all });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);


  /* makes an HTTP request and updates the local state when a new interview is booked */
  const bookInterview = (id, interview) => {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
      })
  };

  /* makes an HTTP request and updates the local state when an interview is canceled */
  const cancelInterview = (id, interview) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview: null } });
      })
  };

  /* hook to connect to a WebSocket server */
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === SET_INTERVIEW) {
        const interview = msg.interview;
        const id = msg.id;

        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
      }
    };
    return () => socket.close();
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
