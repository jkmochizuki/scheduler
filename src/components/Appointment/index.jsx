import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import { CONFIRM, CREATE, DELETING, EDIT, EMPTY, SAVING, SHOW } from "helpers/constants";
import Form from "./Form";

export default function Appointment(props) {
  console.log(props);
  /*
   * props
   *
   * id: number
   * time: string
   * interview: array of objects - representing the appointment's interview. each object contains:
   *   student: string - name of the student to be interviewed
   *   interviewer: object - contains the interviewer's name
   * bookInterview: function
   * cancelInterview: function
   */

  /* when props.interview contains a value, we pass SHOW mode, if it is empty then we pass EMPTY mode */
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW, true);
    });
  }

  function remove(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props.cancelInterview(props.id, interview).then(() => {
      transition(EMPTY, true);
    });  
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={remove}
          onCancel={() => transition(SHOW)}
        />)}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
