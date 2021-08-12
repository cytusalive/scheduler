export const getAppointmentsForDay = (state, weekDay) => {
  if (!state.days.length) {
    return [];
  }

  const { days, appointments } = state;

  const getAppointments = days.filter((day) => day.name === weekDay);

  if (!getAppointments.length) {
    return [];
  }

  return getAppointments[0].appointments.map((id) => appointments[id]);
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  const { student, interviewer: id } = interview;

  const newInterview = {
    student,
    interviewer: state.interviewers[id],
  };

  return newInterview
};

export const getInterviewersForDay = (state, weekDay) => {
  if (!state.days.length) {
    return [];
  }
  
  const { days, interviewers } = state;

  const getAppointments = days.filter((day) => day.name === weekDay);

  if (!getAppointments.length){
    return [];
  }
  
  return getAppointments[0].interviewers.map((id) => interviewers[id]);
};
