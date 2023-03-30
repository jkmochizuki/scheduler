import {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "helpers/constants";
import { updateSpots } from "helpers/selectors";

export function reducer(state, action) {
  /* dispatch actions to set state */
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value[0].data,
        appointments: action.value[1].data,
        interviewers: action.value[2].data,
      };
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview,
      };
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment,
      };
      const days = updateSpots(state, appointments, action.value.id);

      return {
        ...state,
        appointments,
        days,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
