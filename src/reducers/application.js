import {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "helpers/constants";

export function reducer(state, action) {
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
      const days = updateSpots(appointments, action.value.id);

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
