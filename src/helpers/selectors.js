export function getAppointmentsForDay (state, day) {
  const filteredDays = state.days.filter(item => item.name === day);

  if (filteredDays.length > 0) {
    const appointmentsArray = filteredDays[0].appointments;

    /* Loops through appointments array for the day and returns a new array with the appointments objects that match the ids */
    const appointmentsForDay = appointmentsArray.map((id) => state.appointments[id]);
    return appointmentsForDay;
  }
  return [];
}

export function getInterview (state, appointment) {
  if (appointment) {
    /* Finds the interviewer id and updates the appointment object to include the interviewer object */
    const interviewer = Object.values(state.interviewers).find(interviewer => appointment.interviewer === interviewer.id);
    return {
      ...appointment,
      interviewer
    }
  }
  return null;
}

export function getInterviewersForDay (state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  
  if (filteredDays.length > 0) {
    const interviewersArray = filteredDays[0].interviewers;

    /* Loops through interviewers array for the day and returns a new array with the interviewers objects that match the ids */
    const interviewersForDay = interviewersArray.map((id) => state.interviewers[id]);
    return interviewersForDay;
  }
  return [];
}
