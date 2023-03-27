import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  /*
   * props
   *
   * name: string
   * avatar: url
   * selected: boolean
   * setInterviewer: function - will be called when the interviewer is clicked
   */

  const interviewerClass = classNames(
    "interviewers__item",
    props.selected && "interviewers__item--selected"
  );

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
