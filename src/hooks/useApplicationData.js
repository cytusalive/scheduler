import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const getDays = "api/days";
    const getAppointments = "api/appointments";
    const getInterviewers = "api/interviewers";

    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviewers)
    ]).then((all) => {
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    })
  }, []);

  const updatedSpots = (state, day) => {
    const currentDay = day || state.day;

    const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay);
    const currentDayObjIndex = state.days.findIndex(dayObj => dayObj.name === currentDay);

    const listOfApptIds = currentDayObj.appointments;

    const listOfFreeAppointments = listOfApptIds.filter(apptId => !state.appointments[apptId].interview);

    const newSpots = listOfFreeAppointments.length;
  
    const updatedState = { ...state };
    updatedState.days = [...state.days];
    const updatedDay = { ...currentDayObj };
    updatedDay.spots = newSpots;
    updatedState.days[currentDayObjIndex] = updatedDay;

    return updatedState;
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, {interview}).then(response => {
      setState(updatedSpots({...state, appointments}));
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`).then(response => {
      setState(updatedSpots({...state,appointments}));
    })
  };

  return { state, setDay, bookInterview, cancelInterview };
};