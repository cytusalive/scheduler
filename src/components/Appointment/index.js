import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment (props) {
   
  const { time, interview } = props;
  let interviewers = [];

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className='appointment'>
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />} 
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()}/>}
    </article>
  )
}