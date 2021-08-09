export function getAppointmentsForDay(state, day) {
  let output = [];

  if(state.days.length === 0){
    return output;
  }
  const filteredDay = state.days.filter(data => data.name === day)

  if(Object.keys(filteredDay).length) {
    const mappedAppointments = filteredDay[0].appointments.map (el => state.appointments[el])
    output = mappedAppointments;
  }

  return output;
} 

export function getInterview(state, interview) {

  if (!interview){
    return null;
  }

  let filteredInterview;
  let filteredInterviewer;
  for (const key in state.appointments) {
    if(state.appointments[key].interview !== null && state.appointments[key].interview.interviewer === interview.interviewer) {
      filteredInterview = state.appointments[key].interview; 
      filteredInterviewer = interview.interviewer; 
      filteredInterview['interviewer'] = state.interviewers[filteredInterviewer]; 
    }
  }

  return filteredInterview;
} 