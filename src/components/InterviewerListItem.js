import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem (props) {
  // console.log('InterviewerListItem props', props);
  
  const interviewerClass = classNames(
    'interviewers__item',
    props.selected && 'interviewers__item--selected'
  )

  const formatName = (name) => {
    return props.selected ? `${name}` : '';
  }

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {formatName(props.name)}
    </li>
  )
}