import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const dayClass = classNames(
    'day-list__item',
    props.selected && 'day-list__item--selected',
    props.spots === 0 && 'day-list__item--full'
  )

  const formatSpots = (spots) => {
    return !spots ? 'no spots remaining' :
           spots === 1 ? '1 spot remaining' :
           `${spots} spots remaining`;
  }

  return (
    <li
      className={dayClass}
      /* When we call the setDay action, it changes the day state => the <Application> renders and passes the new day to the <DayList> => <DayList> renders and passes props to the <DayListItem> children causing the updates to the selected visual state. */
      onClick={props.setDay}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}