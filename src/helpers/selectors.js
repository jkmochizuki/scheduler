export function getAppointmentsForDay (state, day) {
  const filteredDays = state.days.filter(item => item.name === day);

  if (filteredDays.length > 0) {
    const appointmentsArray = filteredDays[0].appointments;

    // Loops through appointments array for the day and return a new array with the appointments objects that match the ids
    const appointmentsForDay = appointmentsArray.map((id) => state.appointments[id]);
    return appointmentsForDay;
  }
  return [];
}

export function getInterview (state, appointment) {
  if (appointment) {
    const interviewer = Object.values(state.interviewers).find(interviewer => appointment.interviewer === interviewer.id);
    return {
      ...appointment,
      interviewer
    }
  }
  return null;
}
