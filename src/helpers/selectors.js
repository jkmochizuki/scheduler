/* returns appointments for a given day */
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);

  if (filteredDays) {
    const appointmentsArray = filteredDays.appointments;
    const appointmentsForDay = appointmentsArray.map(
      (id) => state.appointments[id]
    );
    return appointmentsForDay;
  }
  return [];
}

/* returns the interview for a given appointment */
export function getInterview(state, appointment) {
  if (appointment) {
    const interviewer = Object.values(state.interviewers).find(
      (item) => appointment.interviewer === item.id
    );
    return {
      ...appointment,
      interviewer
    };
  }
  return null;
}

/* returns interviewers for a given day */
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);

  if (filteredDays) {
    const interviewersArray = filteredDays.interviewers;
    const interviewersForDay = interviewersArray.map(
      (id) => state.interviewers[id]
    );
    return interviewersForDay;
  }
  return [];
}

  /* when an appointment is added or removed, it updates the number of spots remaining in that day */
  export function updateSpots(state, appointments, id) {
    const day = state.days.find((d) => d.appointments.includes(id));
    const nullAppointments = day.appointments.filter(
      (appointmentId) => appointments[appointmentId].interview === null
    );
    const spots = nullAppointments.length;

    const days = state.days.map((d) =>
      d.appointments.includes(id) ? { ...d, spots } : d
    );

    return days;
  };