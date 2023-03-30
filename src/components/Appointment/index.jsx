import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import {
  CONFIRM,
  CREATE,
  DELETING,
  EDIT,
  EMPTY,
  ERROR_DELETE,
  ERROR_SAVE,
  SAVING,
  SHOW,
} from "helpers/constants";
import Form from "./Form";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  /* when interview contains a value, we pass SHOW mode, if it is empty then we pass EMPTY mode */
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  /* updates the mode when the update comes from WebSocket server */
  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  /* saves a new booked interview */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  /* deletes an interview */
  function destroy() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={destroy}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && (
        <Error message="Could not save." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete." onClose={() => back()} />
      )}
    </article>
  );
}
