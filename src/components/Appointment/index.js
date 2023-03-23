import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment (props) {

 /*
  * props
  *
  * time: string
  * interview: array of objects - representing the appointment's interview. each object contains:
  *   student: string - name of the student to be interviewed
  *   interviewer: object - contains the interviewer's name
  */
  
  return (
    <article className="appointment">
      <Header
        time={props.time}
      />

      <>
        {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
        :
        <Empty/>}
      </>

    </article>
  );
}
