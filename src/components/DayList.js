import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) { // props -> array of objects (days)

  const dayLists = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={day.setDay} // updates the currently selected day in the parent component's state when this day is clicked
      />
    );
  })

  return (
    <ul>
      {dayLists}
    </ul>
  );
}