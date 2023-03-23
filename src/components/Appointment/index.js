import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import { EMPTY, SHOW } from "helpers/constants";

export default function Appointment (props) {

 /*
  * props
  *
  * time: string
  * interview: array of objects - representing the appointment's interview. each object contains:
  *   student: string - name of the student to be interviewed
  *   interviewer: object - contains the interviewer's name
  */
  
  /* when props.interview contains a value, we pass SHOW mode, if it is empty then we pass EMPTY mode */
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY &&
        <Empty
          onAdd={() => console.log("Clicked onAdd")}
        />
      }
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      }
    </article>
  );
}
