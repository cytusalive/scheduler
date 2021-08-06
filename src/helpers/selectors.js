export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let output = [];

  const filteredDays = state.days.filter(data => data.name === day)[0];
  
  if (!filteredDays) {
    return output;
  }

  filteredDays['appointments'].map(id => {
    output.push(state.appointments[id]);
  })

  return output;
};