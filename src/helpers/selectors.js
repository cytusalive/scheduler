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
  if (!interview) {
    return null;
  }
  
  const id = interview.interviewer;
  const newInterviewObj = {};
  newInterviewObj.interviewer = state.interviewers[id];
  newInterviewObj.student = interview.student;

  return newInterviewObj;
} 
