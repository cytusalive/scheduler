import React from 'react';
import DayList from './DayList';

import 'components/Application.scss';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';


export default function Application(props) {
  const { state, setDay, cancelInterview, bookInterview, editInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          {' '}
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);

          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
              editInterview={editInterview}
            />
          );
        })}
      </section>
    </main>
  );
}